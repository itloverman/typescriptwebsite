---
display: "Declaration Dir"
---

Offers a way to configure the root directory for where declaration files are emitted.

```
example
├── index.ts
├── package.json
└── tsconfig.json
```

with this `tsconfig.json`:

```json
{
      "compilerOptions": {
        "declaration": true,
        "declarationDir": "./types"
    }
}
```

Would place the d.ts for the `index.ts` in a `types` folder:

```
example
├── index.js
├── index.ts
├── package.json
├── tsconfig.json
└── types
    └── index.d.ts
```
