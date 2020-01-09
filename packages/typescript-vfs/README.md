### TypeScript VFS

A map based TypeScript Virtual File System.

Useful when you need to:

- Run TypeScript in the browser
- Run virtual TypeScript environments where files on disk aren't the source of truth

The current API is based on you knowing all of the files upfront.

### Usage

You start with creating a map which represents all the files in the virtual `ts.System`:

```ts
import { createSystem } from 'typescript-vfs'

const fsMap = new Map<string, string>()
fsMap.set("index.ts', 'const a = "Hello World"')

const system = createSystem(fsMap)
```

Then you can create a virtual TypeScript Environment:

```ts
import { createSystem, createVirtualTypeScriptEnvironment } from 'typescript-vfs'
import ts from 'typescript'

const fsMap = new Map<string, string>()
const system = createSystem(fsMap)

const compilerOpts = {}
const env = createVirtualTypeScriptEnvironment(system, ['index.ts'], ts, compilerOpts)

// You can then interact with the languageService to introspect the code
env.languageService.getDocumentHighlights('index.ts', 0, ['index.ts'])
```

When working in tests, or in environments with file system access, you can switch your virtual system with `ts.sys` to use the real filesystem with the virtual environment.

## API

You're most likely interested in the API available in `env.languageService`, here it is as of 3.7.4:

<!-- prettier-ignore-start -->

```ts
interface LanguageService {
    cleanupSemanticCache(): void;
    getSyntacticDiagnostics(fileName: string): DiagnosticWithLocation[];
    getSemanticDiagnostics(fileName: string): Diagnostic[];
    getSuggestionDiagnostics(fileName: string): DiagnosticWithLocation[];
    getCompilerOptionsDiagnostics(): Diagnostic[];
    getEncodedSyntacticClassifications(fileName: string, span: TextSpan): Classifications;
    getEncodedSemanticClassifications(fileName: string, span: TextSpan): Classifications;
    getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined): WithMetadata<CompletionInfo> | undefined;
    getCompletionEntryDetails(fileName: string, position: number, name: string, formatOptions: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined, preferences: UserPreferences | undefined): CompletionEntryDetails | undefined;
    getCompletionEntrySymbol(fileName: string, position: number, name: string, source: string | undefined): Symbol | undefined;
    getQuickInfoAtPosition(fileName: string, position: number): QuickInfo | undefined;
    getNameOrDottedNameSpan(fileName: string, startPos: number, endPos: number): TextSpan | undefined;
    getBreakpointStatementAtPosition(fileName: string, position: number): TextSpan | undefined;
    getSignatureHelpItems(fileName: string, position: number, options: SignatureHelpItemsOptions | undefined): SignatureHelpItems | undefined;
    getRenameInfo(fileName: string, position: number, options?: RenameInfoOptions): RenameInfo;
    findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean, providePrefixAndSuffixTextForRename?: boolean): readonly RenameLocation[] | undefined;
    getSmartSelectionRange(fileName: string, position: number): SelectionRange;
    getDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
    getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan | undefined;
    getTypeDefinitionAtPosition(fileName: string, position: number): readonly DefinitionInfo[] | undefined;
    getImplementationAtPosition(fileName: string, position: number): readonly ImplementationLocation[] | undefined;
    getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[] | undefined;
    findReferences(fileName: string, position: number): ReferencedSymbol[] | undefined;
    getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[] | undefined;
    getNavigateToItems(searchValue: string, maxResultCount?: number, fileName?: string, excludeDtsFiles?: boolean): NavigateToItem[];
    getNavigationBarItems(fileName: string): NavigationBarItem[];
    getNavigationTree(fileName: string): NavigationTree;
    getOutliningSpans(fileName: string): OutliningSpan[];
    getTodoComments(fileName: string, descriptors: TodoCommentDescriptor[]): TodoComment[];
    getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
    getIndentationAtPosition(fileName: string, position: number, options: EditorOptions | EditorSettings): number;
    getFormattingEditsForRange(fileName: string, start: number, end: number, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
    getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
    getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, options: FormatCodeOptions | FormatCodeSettings): TextChange[];
    getDocCommentTemplateAtPosition(fileName: string, position: number): TextInsertion | undefined;
    isValidBraceCompletionAtPosition(fileName: string, position: number, openingBrace: number): boolean;
    getJsxClosingTagAtPosition(fileName: string, position: number): JsxClosingTagInfo | undefined;
    getSpanOfEnclosingComment(fileName: string, position: number, onlyMultiLine: boolean): TextSpan | undefined;
    toLineColumnOffset(fileName: string, position: number): LineAndCharacter;
    getCodeFixesAtPosition(fileName: string, start: number, end: number, errorCodes: readonly number[], formatOptions: FormatCodeSettings, preferences: UserPreferences): readonly CodeFixAction[];
    getCombinedCodeFix(scope: CombinedCodeFixScope, fixId: {}, formatOptions: FormatCodeSettings, preferences: UserPreferences): CombinedCodeActions;
    applyCodeActionCommand(action: CodeActionCommand, formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult>;
    applyCodeActionCommand(action: CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult[]>;
    applyCodeActionCommand(action: CodeActionCommand | CodeActionCommand[], formatSettings?: FormatCodeSettings): Promise<ApplyCodeActionCommandResult | ApplyCodeActionCommandResult[]>;
    getApplicableRefactors(fileName: string, positionOrRange: number | TextRange, preferences: UserPreferences | undefined): ApplicableRefactorInfo[];
    getEditsForRefactor(fileName: string, formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string, preferences: UserPreferences | undefined): RefactorEditInfo | undefined;
    organizeImports(scope: OrganizeImportsScope, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
    getEditsForFileRename(oldFilePath: string, newFilePath: string, formatOptions: FormatCodeSettings, preferences: UserPreferences | undefined): readonly FileTextChanges[];
    getEmitOutput(fileName: string, emitOnlyDtsFiles?: boolean, forceDtsEmit?: boolean): EmitOutput;
    getProgram(): Program | undefined;
}
```
<!-- prettier-ignore-end -->

## Usage

It's **very** likely that you will need to set up your lib `*.d.ts` files to use this. If you are running in an environment where you have access to node_modules, then you can can write some code like this:

```ts
const getLib = (name: string) => {
  const lib = dirname(require.resolve('typescript'))
  return readFileSync(join(lib, name), 'utf8')
}

const addLib = (name: string, map: Map<string, string>) => {
  map.set('/' + name, getLib(name))
}

const createDefaultMap2015 = () => {
  const fsMap = new Map<string, string>()
  addLib('lib.es2015.d.ts', fsMap)
  addLib('lib.es2015.collection.d.ts', fsMap)
  addLib('lib.es2015.core.d.ts', fsMap)
  addLib('lib.es2015.generator.d.ts', fsMap)
  addLib('lib.es2015.iterable.d.ts', fsMap)
  addLib('lib.es2015.promise.d.ts', fsMap)
  addLib('lib.es2015.proxy.d.ts', fsMap)
  addLib('lib.es2015.reflect.d.ts', fsMap)
  addLib('lib.es2015.symbol.d.ts', fsMap)
  addLib('lib.es2015.symbol.wellknown.d.ts', fsMap)
  addLib('lib.es5.d.ts', fsMap)
  return fsMap
}
```

This list is the default set of definitions (different options for `target` or `lib` will affect what this list looks like) and it grabs the lib content from the local dependency of TypeScript.

It's safe to say, keeping on top of this list can be a bit tiring and so this library ships functions for generating a map with with these pre-filled. Note: it's possible for this list to get out of sync with TypeScript over time. It was last synced at TypeScript 3.7.4

```ts
import { createSystem, createVirtualTypeScriptEnvironment, createDefaultMapFromNodeModules } from 'typescript-vfs'
import ts from 'typescript'

const fsMap = createDefaultMapFromNodeModules(ts.ScriptTarget.ES2015)
fsMap.set('index.ts', "const hello = 'hi'")
// ...
```

If you don't have access to `node_modules`, then you can use the TypeScript CDN or unpkg to fetch the lib files. This could be is up to about 1.5MB, and you should probably store the values in `localStorage`. If the above is tiring, then this is polish most won't add.

```ts
import { createSystem, createVirtualTypeScriptEnvironment, createDefaultMapFromCDN } from 'typescript-vfs'
import ts from 'typescript'
import lzstring from 'lz-string'

const start = async () => {
  const shouldCache = true
  // This caches the lib files in the site's localStorage
  const fsMap = await createDefaultMapFromCDN(ts.ScriptTarget.ES2015, '3.7.3', shouldCache, ts)

  // This stores the lib files as a zipped string to save space in the cache
  const otherMap = await createDefaultMapFromCDN(ts.ScriptTarget.ES2015, '3.7.3', shouldCache, ts, lzstring)

  fsMap.set('index.ts', "const hello = 'hi'")
  // ...
}

start()
```

The cache:

- Automatically purges items which use a different version of TypeScript to save space
- Can use a copy of the lz-string module for compressing/decompressing the lib files
