// @ts-check
// prettier-ignore
const { readdirSync, statSync, existsSync, readFileSync, writeFileSync } = require("fs");
const { join } = require("path");
const { format } = require("prettier");
const { enRoot, getFilePaths } = require("./generateTypesForFilesInDocs");
const { read: readMarkdownFile } = require("gray-matter");

// This file is the definitive sidebar navigation source. It takes either:
//
// a  { file: 'path; }
// a  { href: "url" title: "Button title", oneliner: "some info" }
// or { title: "Button title", items: SubItems }
//
// For files we use the same language lookup system the rest of the site uses,
// to leave titles, hrefs etc to be done on the document itself

// The results are a generated TS function in put into the file:
// packages/typescriptlang-org/src/lib/documentationNavigation.ts
// where it's used in the website / epub / etc
//

/* 
  Run this after any changes to propagate:
     yarn workspace documentation create-handbook-nav
*/

/** @type {HandbookNavItem[]} */
// prettier-ignore
const handbookPages = [
  {
    title: "Get Started",
    summary: "Quick introductions based on your background or preference.",
    items: [
      { file: "Get Started/TS for the New Programmer.md" },
      { file: "Get Started/TS for JS Programmers.md" },
      { file: "Get Started/TS for OOPers.md" },
      { file: "Get Started/TS for Functional Programmers.md" },
      { file: "tutorials/TypeScript Tooling in 5 minutes.md" },
    ],
  },
  {
    title: "Handbook",
    summary: "A good first read for your daily TS work.",
    chronological: true,
    items: [
      { file: "The Handbook.md" },
      { file: "Basic Types.md" },
      { file: "Interfaces.md" },
      { file: "Functions.md" },
      { file: "Literal Types.md" },
      { file: "Unions and Intersections.md" },
      { file: "Classes.md" },
      { file: "Enums.md" },
      { file: "Generics.md" },
    ],
  },
  {
    title: "Handbook Reference",
    summary: "Deep dive reference materials.",
    items: [
      { file: "Advanced Types.md" },
      { file: "Utility Types.md" },
      { file: "Decorators.md" },
      { file: "Declaration Merging.md" },
      { file: "Iterators and Generators.md" },
      { file: "JSX.md" },
      { file: "Mixins.md" },
      { file: "Modules.md" },
      { file: "Module Resolution.md" },
      { file: "Namespaces.md" },
      { file: "Namespaces and Modules.md" },
      { file: "Symbols.md" },
      { file: "Triple-Slash Directives.md" },
      { file: "Type Compatibility.md" },
      { file: "Type Inference.md" },
      { file: "Variable Declarations.md" },
    ],
  },
  {
    title: "Tutorials",
    summary: "Using TypeScript in several environments.",
    items: [
      { file: "tutorials/ASP.NET Core.md" },
      { file: "tutorials/Gulp.md" },
      { file: "tutorials/DOM Manipulation.md" },
      { file: "tutorials/Migrating from JavaScript.md" },
      { file: "tutorials/Babel with TypeScript.md" },
    ],
  },
  {
    title: "What's New",
    summary:
      "Find out how TypeScript has evolved and what's new in the releases.",
    items: [
      { file: "release notes/Overview.md" },
      // This is auto-filled
    ],
  },
  {
    title: "Declaration Files",
    summary:
      "Learn how to write declaration files to describe existing JavaScript. Important for DefinitelyTyped contributions.",
    chronological: true,
    items: [
      { file: "declaration files/Introduction.md" },
      { file: "declaration files/By Example.md" },
      { file: "declaration files/Do's and Don'ts.md" },
      { file: "declaration files/Deep Dive.md" },
      { file: "declaration files/Library Structures.md" },
      {
        title: ".d.ts Templates",
        items: [
          { file: "declaration files/templates/module.d.ts.md" },
          { file: "declaration files/templates/module-plugin.d.ts.md" },
          { file: "declaration files/templates/module-class.d.ts.md" },
          { file: "declaration files/templates/module-function.d.ts.md" },
          { file: "declaration files/templates/global.d.ts.md" },
          { file: "declaration files/templates/global-modifying-module.d.ts.md" },
        ]
      },
      { file: "declaration files/Publishing.md" },
      { file: "declaration files/Consumption.md" },
    ],
  },
  {
    title: "JavaScript",
    summary: "How to use TypeScript-powered JavaScript tooling.",
    chronological: true,
    items: [
      { file: "Intro to JS with TS.md", },
      { file: "Type Checking JavaScript Files.md" },
      { file: "JSDoc Reference.md" },
      { file: "declaration files/Creating DTS files From JS.md" },
    ],
  },
  {
    title: "Project Configuration",
    summary: "Compiler configuration reference.",
    items: [
      {
        href: "/tsconfig",
        title: "TSConfig Reference",
        oneliner: "The page covering every TSConfig option"
      },
      { file: "tutorials/tsconfig.json.md" },
      { file: "Compiler Options.md" },
      { file: "Project References.md" },
      { file: "Compiler Options in MSBuild.md" },
      { file: "Integrating with Build Tools.md" },
      { file: "Configuring Watch.md" },
      { file: "Nightly Builds.md" },
    ],
  },
]
fillReleaseInfo();

const copyPath = join(__dirname, "..", "copy");
const langs = readdirSync(copyPath).filter((f) =>
  statSync(join(copyPath, f)).isDirectory()
);

/** @type { Record<string, Map<string, import("gray-matter").GrayMatterFile<string>>> }>} */
const langInfo = {};

// Fill up a series of sets of language Maps which have the markdown info available in
for (const lang of langs) {
  const langMap = new Map();
  langInfo[lang] = langMap;

  const allEnPages = getFilePaths(enRoot);
  for (const page of allEnPages) {
    const relativeToLangPath = page.replace(enRoot, "");
    const localPage = join(copyPath, lang + relativeToLangPath);
    if (existsSync(localPage)) {
      const info = readMarkdownFile(localPage);
      if (lang !== "en") {
        validateNonEnglishMarkdownFile(info, lang, localPage);
      }
      validateMarkdownFile(info, localPage);
      // Looks like: path/to/file.md
      langMap.set(relativeToLangPath.slice(1).replace(/\\/g, "/"), info);
    }
  }
}

const codeForTheHandbook = [
  `
export function getDocumentationNavForLanguage(langRequest: string): SidebarNavItem[] {
  const langs = ['${langs.join("', '")}']
  const lang = langs.includes(langRequest) ? langRequest : "en"
  const navigations: Record<string, SidebarNavItem[]> = {} 
`,
];

for (const lang of langs) {
  codeForTheHandbook.push(`navigations.${lang} = [`);

  handbookPages.forEach((section) => {
    // Section metadata:
    codeForTheHandbook.push(`{ 
      title: "${section.title}",
      oneline: "${section.summary}",
      id: "${section.title.toLowerCase().replace(/\s/g, "-")}",
      chronological: ${section.chronological || false},
    `);

    /** @param {{ items?: HandbookNavSubItem[] }} itemable */
    function addItems (itemable) {
      // Lots of 2nd level navs dont have subnav, bail for them
      if ("items" in itemable === false) return;

      codeForTheHandbook.push("items: [");
      for (const subItem of itemable.items) {
        codeForTheHandbook.push(`{ `);

        // Is it a special link?
        if ("href" in subItem) {
          codeForTheHandbook.push(`
        title: "${subItem.title}",
        id: "${toID(subItem.title)}",
        permalink: "${subItem.href}",
        oneline: "${subItem.oneliner}"
      },`);
        } else if ("items" in subItem) {
          //Is is a sub-sub-section?
          codeForTheHandbook.push(`
            title: "${subItem.title}",
            id: "${toID(subItem.title)}",
            oneline: "${subItem.oneliner}",
          `);
          addItems(subItem);
          codeForTheHandbook.push(",");
        } else if ("file" in subItem) {
          // It's a file reference
          const subNavInfo =
            langInfo[lang].get(subItem.file) ||
            langInfo["en"].get(subItem.file);

          if (!subNavInfo) throwForUnfoundFile(subItem, lang, langInfo["en"]);

          codeForTheHandbook.push(`
            title: "${subNavInfo.data.short || subNavInfo.data.title}",
            id: "${toID(subNavInfo.data.title)}",
            permalink: "${subNavInfo.data.permalink}",
            oneline: "${subNavInfo.data.oneline}",
          `);

          const isLast =
            itemable.items.indexOf(subItem) === itemable.items.length - 1;
          const suffix = isLast ? "" : ",";
          codeForTheHandbook.push(`}${suffix} `);
        }
      }
      // closes the outer 'items'
      codeForTheHandbook.push("]\n }");
    }

    // Set up the 1st level of recursion for the 2nd level items
    addItems(section);

    // close subnav items
    const isLast = handbookPages.indexOf(section) === section.items.length - 1;
    const suffix = isLast ? "" : ",";
    codeForTheHandbook.push(`${suffix}`);
  });
  // close sections
  codeForTheHandbook.push(`]`);
}

codeForTheHandbook.push(`
  return navigations[lang]
}`);

// prettier-ignore
const pathToFileWeEdit = join(__dirname, "..", "..", "typescriptlang-org", "src", "lib", "documentationNavigation.ts");
const startMarker = "/** ---INSERT--- */";
const endMarker = "/** ---INSERT-END--- */";
const oldCode = readFileSync(pathToFileWeEdit, "utf8");
const newCode =
  oldCode.split(startMarker)[0] +
  startMarker +
  "\n\n" +
  codeForTheHandbook.join("\n") +
  "\n\n" +
  endMarker +
  oldCode.split(endMarker)[1];

writeFileSync(
  pathToFileWeEdit,
  format(newCode, { filepath: pathToFileWeEdit })
);

/**
 * @typedef {Object} HandbookNavSubItem
 * @property {import("./types/AllFilenames").AllDocsPages= } file - the reference to the file based on the lang root
 * @property {HandbookNavSubItem[]=} items - pages
 * or!
 * @property {string= } href - a language prefixless
 * @property {string= } title - the display only used when href exists
 * @property {string= } oneliner
 */

/**
 * @typedef {Object} HandbookNavItem
 * @property {string} title - TBD
 * @property {string} summary - TDB
 * @property {boolean=} chronological - should we recommend a next/prev
 * @property {HandbookNavSubItem[]} items - pages
 */

function validateNonEnglishMarkdownFile (info, lang, filepath) {
  if (!info.data.permalink.startsWith("/" + lang + "/")) {
    throw new Error(
      `Permalink in ${filepath} does not start with '/${lang}/'\n\n`
    );
  }
}

function validateMarkdownFile (info, filepath) {
  // const needed = ["permalink", "oneline", "title"];
  const needed = ["permalink", "title"];
  const missing = [];
  for (const needs of needed) {
    if (info.data[needs] === undefined) {
      missing.push(needs);
    }
  }
  if (missing.length) {
    // prettier-ignore
    throw new Error(`You need to have '${missing.join("', '")}' in the YML for ${filepath}\n\n`);
  }
}

function throwForUnfoundFile (subItem, lang, langInfo) {
  const keys = [...langInfo.keys()];
  // prettier-ignore
  throw new Error(`Could not find the file '${subItem.file}' from the handbook nav in either ${lang} or 'en' - has: ${keys.join(", ")}`);
}

function fillReleaseInfo () {
  const whatIsNew = handbookPages.find((h) => h.title === "What's New");
  const files = readdirSync(
    join(__dirname, "..", "copy", "en", "release notes")
  );
  for (const file of files.reverse()) {
    // @ts-ignore
    whatIsNew.items.push({ file: "release notes/" + file });
  }
}

function toID (str) {
  return str.toLowerCase().replace(/\s/g, "-");
}
