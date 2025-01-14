import monaco from "monaco-editor/esm/vs/editor/editor.api";
export const editorOptions: monaco.editor.IStandaloneEditorConstructionOptions =
  {
    wordWrap: "on", //* Make word to  wrap
    minimap: {
      enabled: false, //* Disable minimap
    },
    showUnused: true, //* Don't fade unused statements
    folding: false, //* Collapse left margin of the lines
    lineNumbersMinChars: 3, //* Decrease right side of the line number
    fontSize: 18, //* font size
    scrollBeyondLastLine: true,
    automaticLayout: true, //* Auto adjust for resizing
    tabSize: 2, //* Tab size inside editor
    lineHeight: 30, //* Line height
  };

export const configuration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"],
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"],
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
  ],
};

export const languageDef:
  | monaco.languages.IMonarchLanguage
  | monaco.Thenable<monaco.languages.IMonarchLanguage> = {
  keywords: [
    "as",
    "async",
    "await",
    "break",
    "const",
    "continue",
    "crate",
    "dyn",
    "else",
    "enum",
    "extern",
    "false",
    "fn",
    "for",
    "if",
    "impl",
    "in",
    "let",
    "loop",
    "match",
    "mod",
    "move",
    "mut",
    "pub",
    "ref",
    "return",
    "self",
    "Self",
    "static",
    "struct",
    "super",
    "trait",
    "true",
    "type",
    "unsafe",
    "use",
    "where",
    "while",
    "dyn",
    "abstract",
    "become",
    "box",
    "do",
    "final",
    "macro",
    "override",
    "priv",
    "try",
    "typeof",
    "unsized",
    "virtual",
    "yield",
  ],
  operators: [
    "!",
    "!=",
    "%",
    "%=",
    "&",
    "&=",
    "&&",
    "*",
    "*=",
    "+",
    "+=",
    "-",
    "-=",
    "->",
    ".",
    "..",
    "...",
    "/",
    "/=",
    ":",
    ";",
    "<<",
    "<<=",
    "<",
    "<=",
    "=",
    "==",
    "=>",
    ">",
    ">=",
    ">>",
    ">>=",
    "?",
    "@",
    "^",
    "^=",
    "|",
    "|=",
    "||",
    "_",
  ],
  symbols: /[=><!~?:&|+\-*/^%]+/,
  escapes: /\\(?:[nrt\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
  tokenizer: {
    root: [
      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],
      [/[{}()\[\]]/, "@brackets"],
      [
        /@symbols/,
        {
          cases: {
            "@operators": "operator",
            "@default": "",
          },
        },
      ],
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],
      [/[;,.]/, "delimiter"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"/, "string", "@string"],
      [/'[^\\']'/, "string"],
      [/(')(@escapes)(')/, ["string", "string.escape", "string"]],
      [/'/, "string.invalid"],
    ],
    string: [
      [/[^\\"]+/, "string"],
      [/\\./, "string.escape"],
      [/"/, "string", "@pop"],
    ],
  },
};
