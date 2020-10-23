---
display: "Max Node Module JS Depth"
oneline: "The maximum number of JS files to look search under node_modules and load JavaScript files without declaration files. Only applicable with `allowJs`."
---

The maximum dependency depth to search under `node_modules` and load JavaScript files.

This flag is can only be used when [`allowJs`](#allowJs) is enabled, and is used if you want to have TypeScript infer types for all of the JavaScript inside your `node_modules`.

Ideally this should stay at 0 (the default), and `d.ts` files should be used to explicitly define the shape of modules.
However, there are cases where you may want to turn this on at the expense of speed and potential accuracy.
