// @ts-check
// Loops through all the sample code and ensures that twoslash doesn't raise
const chalk = require("chalk").default;

const tick = chalk.bold.greenBright("✓");
const cross = chalk.bold.redBright("⤫");

const { readdirSync, readFileSync } = require("fs");
const { join } = require("path");

const remark = require("remark");
const remarkTwoSlash = require("gatsby-remark-shiki-twoslash");

const { read } = require("gray-matter");

const languages = readdirSync(join(__dirname, "..", "copy")).filter((f) => !f.startsWith("."));

console.log("Linting the sample code which uses twoslasher in ts-config");

// Pass in a 2nd arg to filter which markdown to run
const filterString = process.argv[2] ? process.argv[2] : "";

const errorReports = [];

languages.forEach((lang) => {
  const locale = join(__dirname, "..", "copy", lang);
  const options = readdirSync(join(locale, "options")).filter((f) => !f.startsWith("."));
  console.log("\n\nLanguage: " + chalk.bold(lang) + "\n");

  options.forEach((option) => {
    if (filterString.length && !option.includes(filterString)) return;

    const optionPath = join(locale, "options", option);

    const markdown = readFileSync(optionPath, "utf8");
    const markdownAST = remark().parse(markdown);
    let hasError = false;

    try {
      remarkTwoSlash.runTwoSlashAcrossDocument({ markdownAST }, {});
    } catch (error) {
      hasError = true;
      errorReports.push({ path: optionPath, error });
    }

    const optionFile = read(optionPath);
    if (!optionFile.data.display) {
      hasError = true;
      // prettier-ignore
      errorReports.push({ path: optionPath, error: new Error("Did not have a 'display' property in the YML header") });
    }

    if (!optionFile.data.oneline) {
      hasError = true;
      // prettier-ignore

      errorReports.push({ path: optionPath, error: new Error("Did not have a 'oneline' property in the YML header") });
    }

    const sigil = hasError ? cross : tick;
    const name = hasError ? chalk.red(option) : option;
    process.stdout.write(name + " " + sigil + ", ");
  });
});

if (errorReports.length) {
  process.exitCode = 1;

  errorReports.forEach((err) => {
    console.log(`\n> ${chalk.bold.red(err.path)}\n`);
    err.error.stack = undefined;
    console.log(err.error);
  });
  console.log("\n\n");
}
