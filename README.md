### Meta

- **URLs:** [production](https://www.typescriptlang.org), [staging](http://testsite-typescript-41eeb979-7eaa-4c74-9d47-9d182c7b61ab.azurewebsites.net/)
- **Admin:** Prod: [Azure Portal](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/99160d5b-9289-4b66-8074-ed268e739e8e/resourceGroups/Default-Web-WestUS/providers/Microsoft.Web/sites/TypeScript-1ebb3390-2634-4956-a955-eab987b7bb25/appServices), [Deploy logs](https://ms.portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/99160d5b-9289-4b66-8074-ed268e739e8e/resourceGroups/Default-Web-WestUS/providers/Microsoft.Web/sites/TypeScript-1ebb3390-2634-4956-a955-eab987b7bb25/vstscd)

### Getting Started

This repo uses [yarn workspaces][y-wrk] with node 13, to get started clone this repo and run `yarn install`.

```sh
git clone https://github.com/microsoft/TypeScript-website
cd TypeScript-website
yarn install
yarn bootstrap
code .
```

Working on this repo is done by running `yarn start` - this starts up the website on port `8000` and creates a
builder worker for every package in the repo, so if you make a change outside of the site it will compile and lint etc.

Some useful knowledge:

- All packages have: `yarn bootstrap`, `yarn build` and `yarn test`
- All packages use [debug](https://www.npmjs.com/package/debug) - which means you can do `env DEBUG="*" yarn test` to get verbose logs

## Deployment

Deployment is automatic:

- Merges to the branch `master` trigger deploys to production of the v1 website, and the v2 of branch in a [`/v2` subfolder](https://www.typescriptlang.org/v2/).
- Pushes to the branch `v2` deploy to [staging](http://testsite-typescript-41eeb979-7eaa-4c74-9d47-9d182c7b61ab.azurewebsites.net/).

You can find the build logs in [GitHub Actions](https://github.com/microsoft/TypeScript-Website/actions)

## Overview

If you want to know _in-depth_ how this website works, there is an [hour long video covering the codebase, deployment and tooling on YouTube.](https://www.youtube.com/watch?v=HOvivt6B7hE).

# Website Packages

## TypeScriptLang-Org

The main website for TypeScript, a Gatsby website which is statically deployed. You can run it via:

```sh
yarn start
```

## Sandbox

The editor aspect of the TypeScript Playground REPL, useable for all sites which want to show a monaco editor
with TypeScript or JavaScript code.

## Playground

The JS code as an AMD module for the playground which is loaded at runtime in the Playground website.

# Doc Packages

## TSConfig Reference

A set of tools and scripts for generating a comprehensive API reference for the TSConfig JSON file.

```sh
# Generate JSON from the typescript cli
yarn workspace tsconfig-reference run generate-json
# Jams them all into a single file
yarn workspace tsconfig-reference run generate-markdown
```

Validate the docs

```sh
yarn workspace tsconfig-reference run test

# or to just run the linter without a build
yarn workspace tsconfig-reference run lint

# or to just one one linter for a single doc
yarn workspace tsconfig-reference run lint resolveJson
```

## Handbook V1

The existing docs for TypeScript as a direct import the repo of [microsoft/TypeScript-Handbook](https://github.com/microsoft/TypeScript-Handbook/)

## Playground Examples

The code samples used in the Playground split across many languages

# Infra Packages

Most of of these packages use [`tsdx`](https://github.com/jaredpalmer/tsdx).

## TS Twoslash

A code sample markup extension for TypeScript.

## Gatsby Remark Twoslasher Code Blocks

A Gatsby Remark plugin which runs twoslash for any code blocks with twoslash in their metadata

## Gatsby Remark Shiki

A Gatsby Remark plugin which highlights code (using vscode's parsers) then annotates the code with twoslash information

## TypeScript VFS

A comprehensive way to run TypeScript projects in-memory in a browser or node environment

## Create Playground Plugin

A template for generating a new playground plugin which you can use via `npm init playground-plugin [name]`

# Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

# Legal Notices

Microsoft and any contributors grant you a license to the Microsoft documentation and other content
in this repository under the [Creative Commons Attribution 4.0 International Public License](https://creativecommons.org/licenses/by/4.0/legalcode),
see the [LICENSE](LICENSE) file, and grant you a license to any code in the repository under the [MIT License](https://opensource.org/licenses/MIT), see the
[LICENSE-CODE](LICENSE-CODE) file.

Microsoft, Windows, Microsoft Azure and/or other Microsoft products and services referenced in the documentation
may be either trademarks or registered trademarks of Microsoft in the United States and/or other countries.
The licenses for this project do not grant you rights to use any Microsoft names, logos, or trademarks.
Microsoft's general trademark guidelines can be found at http://go.microsoft.com/fwlink/?LinkID=254653.

Privacy information can be found at https://privacy.microsoft.com/en-us/

Microsoft and any contributors reserve all other rights, whether under their respective copyrights, patents,
or trademarks, whether by implication, estoppel or otherwise.

[y-wrk]: https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/
