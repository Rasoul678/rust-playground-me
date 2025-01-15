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
    lineHeight: 30, //* Line height,
    theme: "rust-theme",
    language: "rust",
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
    "macro_rules",
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
      // Highlight `mut` as a keyword
      [/\bmut\b/, "keyword.mut"],
      // Lifetimes (e.g., 'a, 'static)
      [/'[a-zA-Z_]\w*/, "keyword.lifetime"],

      // `self` and `Self` keywords
      [/\b(self|Self)\b/, "special.self"],

      // Single-line comments
      [/\/\/.*$/, "comment"],
      // Block comments
      [/\/\*/, "comment", "@blockComment"],

      // Macro rules (macro_rules! followed by a macro name)
      [
        /(macro_rules!)(\s+)([a-zA-Z_]\w*)/,
        ["keyword.macro", "", "macro.name"],
      ],
      // Macro patterns (e.g., $x:expr)
      [/\$[a-zA-Z_]\w*/, "macro.pattern"], // Match macro variables like $x
      [/:[a-zA-Z_]\w*/, "macro.pattern"], // Match macro types like :expr

      // Macro calls (identifiers followed by ! and parentheses or curly braces)
      [/([a-zA-Z_]\w*)(!)(\s*)([({])/, ["macro.call", "macro.call", "", ""]],
      [/([a-zA-Z_]\w*)(!)(\s*)([\[{])/, ["macro.call", "macro.call", "", ""]],

      // Types (primitive and user-defined)
      [
        /\b(i8|i16|i32|i64|i128|isize|u8|u16|u32|u64|u128|usize|f32|f64|bool|char|str)\b/,
        "type.primitive",
      ], // Primitive types
      [/\b([A-Z][a-zA-Z0-9_]*)\b/, "type"], // User-defined types (e.g., structs, enums)

      // Function names (identifiers that follow the `fn` keyword)
      [/(fn\s+)([a-zA-Z_]\w*)/, ["keyword", "function"]],
      // Function calls (identifiers followed by parentheses)
      [/([a-zA-Z_]\w*)(\s*)(\()/, ["function.call", "", ""]],

      // Numbers (integers, floats, hex, octal, binary)
      [/\b\d+(_\d+)*\b/, "number"], // Decimal integers (e.g., 42, 1_000_000)
      [/\b0x[0-9a-fA-F]+(_[0-9a-fA-F]+)*\b/, "number.hex"], // Hexadecimal (e.g., 0xFF)
      [/\b0o[0-7]+(_[0-7]+)*\b/, "number.octal"], // Octal (e.g., 0o77)
      [/\b0b[01]+(_[01]+)*\b/, "number.binary"], // Binary (e.g., 0b1010)
      [/\b\d+(_\d+)*\.\d+(_\d+)*([eE][\-+]?\d+(_\d+)*)?\b/, "number.float"], // Floats (e.g., 3.14, 1.0e-10)

      // Control flow keywords (if, else, match, etc.)
      [
        /\b(if|else|match|loop|while|for|break|continue|return)\b/,
        "keyword.control",
      ],

      [
        /[a-zA-Z_]\w*/,
        {
          cases: {
            "@keywords": "keyword",
            "@default": "identifier",
          },
        },
      ],

      // #[derive] attributes
      [/#\[derive\(/, "attribute", "@derive"],
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
    derive: [
      // Traits inside #[derive(...)]
      [/([a-zA-Z_]\w*)(,?)/, ["attribute.trait", ""]],
      [/\)/, "attribute", "@pop"], // End of #[derive(...)]
    ],
    blockComment: [
      [/[^*]+/, "comment"], // Match anything that's not a *
      [/\*\//, "comment", "@pop"], // Match */ and exit the block comment state
      [/./, "comment"], // Match any other character
    ],
  },
};

export const rules: monaco.editor.ITokenThemeRule[] = [
  // Keywords
  { token: "keyword", foreground: "#0096FF" }, // fn, let, mut, etc.
  { token: "keyword.control", foreground: "#E97451" }, // if, else, match, etc.
  { token: "keyword.operator", foreground: "#D4D4D4" }, // +, -, *, /, etc.
  { token: "keyword.lifetime", foreground: "#D27D2D" }, // 'static, 'a, etc.
  { token: "keyword.mut", foreground: "#FF5733" }, // mut

  // Highlight macro names
  { token: "keyword.macro", foreground: "#AAFF00" },
  { token: "macro.name", foreground: "#50C878" },
  // Highlight macro patterns (e.g., $x:expr)
  { token: "macro.pattern", foreground: "#50C878" },
  // Highlight macro calls in purple
  { token: "macro.call", foreground: "#50C878" },

  // Types
  { token: "type", foreground: "#E49B0F" }, // i32, String, etc.
  { token: "type.primitive", foreground: "#FF3131" }, // Primitive types like u8, bool

  // Functions
  { token: "function", foreground: "#AAFF00" }, // Function names
  { token: "function.call", foreground: "#50C878" }, // Function calls

  // Variables
  { token: "identifier", foreground: "#8BE9FD" }, // Variables
  { token: "variable.parameter", foreground: "#9CDCFE" }, // Function parameters

  // Strings
  { token: "string", foreground: "#E1C16E" }, // String literals
  { token: "string.escape", foreground: "#D7BA7D" }, // Escape sequences

  // Highlight numbers in light green
  { token: "number", foreground: "#FFC300" },
  { token: "number.hex", foreground: "#FFC300" },
  { token: "number.octal", foreground: "#FFC300" },
  { token: "number.binary", foreground: "#FFC300" },
  { token: "number.float", foreground: "#FFC300" },

  // Highlight comments in green
  { token: "comment", foreground: "#6A9955", fontStyle: "italic" },

  // Operators
  { token: "operator", foreground: "#DE3163" }, // Operators like +, -, *, /

  // Special
  { token: "special", foreground: "#FFD700" }, // Special tokens
  // Highlight `self` and `Self` in orange
  { token: "special.self", foreground: "#D7BA7D", fontStyle: "italic" },

  // Highlight #[derive] attributes in purple
  { token: "attribute", foreground: "#9CDCFE" },
  // Highlight traits inside #[derive(...)] in light blue
  { token: "attribute.trait", foreground: "#FFC300" },
];

export const colors = {
  "editor.background": "#1E1E1E", // Editor background color
  "editor.foreground": "#D4D4D4", // Default text color
  "editor.lineHighlightBackground": "#2D2D2D", // Current line highlight
  "editor.selectionBackground": "#3A3D41", // Selection background
  "editorCursor.foreground": "#AEAFAD", // Cursor color
  "editor.lineNumbers.foreground": "#858585", // Line numbers
  "editorGutter.background": "#1E1E1E", // Gutter background
};
