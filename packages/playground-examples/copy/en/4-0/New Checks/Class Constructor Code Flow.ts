//// { compiler: { ts: "3.9.0" } }
//
// In 4.0, we use code flow analysis to
// infer the potential type of a class based on
// what values are set during the constructor.

class UserAccount {
  id; // Type is inferred as string | number
  constructor(isAdmin: boolean) {
    if (isAdmin) {
      this.id = "admin";
    } else {
      this.id = 0;
    }
  }
}

// In previous versions of TypeScript, `id` would
// have been classed as an `any`.
