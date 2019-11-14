---
display: "Generate CPU Profile"
introduced: "3.7"
---

This option gives you the chance to have TypeScript emit a v8 CPU profile during the compiler run. The CPU profile  can provide insight into why your builds may be slow.

This option can only be used from the CLI via: `--generateCpuProfile tsc-output.cpuprofile`.

```sh
npm run tsc --generateCpuProfile tsc-output.cpuprofile
```

This file can be opened in a chromium based browser like Chrome or Edge Developer in [the CPU profiler](https://developers.google.com/web/tools/chrome-devtools/rendering-tools/js-execution) section.
