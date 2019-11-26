---
display: "Source Root"
---

Specify the location where a debugger should locate TypeScript files instead of via source locations. 
This string is treated verbatim inside the source-map, you can use a path or URL:

```json
{ 
  "compilerOptions": {
    "sourceMap": true,
    "sourceRoot": "https://my-website.com/debug/source/"
  }
}
```

Would declare that `index.js` will have a source file at `https://my-website.com/debug/source/index.ts`. 
