// @filename: projectRoot/index.ts
export * from "./nested/base"

// @filename: projectRoot/nested/base.ts
export const a = "123"

// @bundledPackageName: hello
// @module: amd
// @outfile: index.js
// @declaration: true
// @showEmit
// @showEmittedFile: index.d.ts
