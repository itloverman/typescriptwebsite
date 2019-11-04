import { CompilerOptionName } from '../data/_types'

/** Options which should never show on the references, basically anything that's for the CLI not the TSConfig */
export const denyList: CompilerOptionName[] = ['help', 'init', 'all', 'watch', 'version', 'build', 'project']

/** Things we should document, but really want to help move people away from */
export const deprecated: CompilerOptionName[] = ['out']

/** Things which people really shouldn't use, but need to document  */
export const internal: CompilerOptionName[] = ['preserveWatchOutput']

/** Allows linking between options */
export const relatedTo: [CompilerOptionName, CompilerOptionName[]][] = [
  ['strict', ['strictBindCallApply', 'strictFunctionTypes', 'strictPropertyInitialization']],

  ['out', ['outDir', 'outFile']],
  ['outDir', ['out', 'outFile']],
  ['outFile', ['out', 'outDir']],
]

/**
 * Options are taken from the compiler flags markdown docs...
 * So err, they are like 90% reliable. 
 */

export const defaultsForOptions = {
  allowJs: 'false',
  allowSyntheticDefaultImports: 'module === "system" or esModuleInterop',
  allowUmdGlobalAccess: 'false',
  allowUnreachableCode: 'false',
  allowUnusedLabels: 'false',
  alwaysStrict: 'false',
  baseUrl: 'n/a',
  charset: 'utf8',
  checkJs: 'false',
  composite: 'true',
  declaration: 'True when TS',
  declarationDir: ' n/a',
  declarationMap: 'false',
  diagnostics: 'false',
  disableSizeLimit: 'false',
  downlevelIteration: 'false',
  emitBOM: 'false',
  emitDeclarationOnly: 'false',
  esModuleInterop: 'false',
  extendedDiagnostics: 'false',
  forceConsistentCasingInFileNames: 'false',
  generateCpuProfile: ' profile.cpuprofile',
  importHelpers: 'false',
  incremental: 'true',
  inlineSourceMap: 'false',
  inlineSources: 'false',
  isolatedModules: 'false',
  jsx: '"preserve"',
  jsxFactory: 'React"',
  keyofStringsOnly: 'false',
  lib: 'n/a',
  listEmittedFiles: 'false',
  listFiles: 'false',
  locale: 'Platform specific',
  mapRoot: 'n/a',
  maxNodeModuleJsDepth: '0',
  newLine: 'Platform specific',
  noEmit: 'false',
  noEmitHelpers: 'false',
  noEmitOnError: 'false',
  noErrorTruncation: 'false',
  noFallthroughCasesInSwitch: 'false',
  noImplicitAny: 'false',
  noImplicitReturns: 'false',
  noImplicitThis: 'false',
  noImplicitUseStrict: 'false',
  noLib: 'false',
  noResolve: 'false',
  noStrictGenericChecks: 'false',
  noUnusedLocals: 'false',
  noUnusedParameters: 'false',
  out: 'n/a',
  outDir: 'n/a',
  outFile: 'n/a',
  preserveConstEnums: 'false',
  preserveSymlinks: 'false',
  preserveWatchOutput: 'false',
  pretty: 'true',
  reactNamespace: '"React"',
  removeComments: 'false',
  resolveJsonModule: 'false',
  rootDir: 'Computed from the list of input files',
  skipDefaultLibCheck: 'false',
  skipLibCheck: 'false',
  sourceMap: 'false',
  strict: 'false',
  strictBindCallApply: 'false',
  strictFunctionTypes: 'false',
  strictPropertyInitialization: 'false',
  strictNullChecks: 'false',
  suppressExcessPropertyErrors: 'false',
  suppressImplicitAnyIndexErrors: 'false',
  target: 'false',
  traceResolution: 'false',
  tsBuildInfoFile: ' .tsbuildin',
}
