import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { configuration, languageDef } from "../components/editor/setup";

type editorRefType =
  React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
export const useRegisterRustLanguage = (editorRef: editorRefType) => {
  React.useEffect(() => {
    const rustLanguage = {
      id: "rust",
      extensions: [".rs"],
      aliases: ["Rust", "rust"],
      mimetypes: ["text/rust"],
    };

    // Register Rust language
    monaco.languages.register(rustLanguage);
    // Define Rust syntax highlighting (Monarch grammar)
    monaco.languages.setMonarchTokensProvider("rust", languageDef);
    // Define Rust language configuration
    monaco.languages.setLanguageConfiguration("rust", configuration);

    // Define custom theme
    // monaco.editor.defineTheme("rust-theme", {
    //   base: "vs-dark",
    //   inherit: true,
    //   rules: [
    //     { token: "keyword", foreground: "#569CD6" },
    //     { token: "string", background: "#CE9178" },
    //     { token: "comment", foreground: "#6A9955" },
    //     { token: "number", foreground: "#B5CEA8" },
    //     { token: "identifier", foreground: "#9CDCFE" },
    //     { token: "operator", foreground: "#D4D4D4" },
    //     { token: "delimiter", foreground: "#D4D4D4" },
    //     { token: "brackets", foreground: "#FFD700" },
    //     { token: "escape", foreground: "#D7BA7D" },
    //   ],
    //   colors: {
    //     "editor.background": "#000000",
    //     "editor.foreground": "#333333",
    //   },
    // });

    // Cleanup on unmount
    return () => {
      editorRef.current?.dispose();
    };
  }, [editorRef.current]);
};
