---
display: "Sem Retornos Implícitos"
oneline: "Garante que todos os caminhos de código de uma função tenham retorno"
---

Quando habilitado, o TypeScript verificará todos os caminhos de código em uma função para garantir que eles retornem um valor.

```ts twoslash
// @errors: 2366 2322
function ProcurarFabricanteDeFonesDeOuvido(color: "azul" | "preto"): string {
  if (cor === "azul") {
    return "beats";
  } else {
    "bose";
  }
}
```
