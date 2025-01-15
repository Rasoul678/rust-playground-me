import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import RunButton from "../run-button/RunButton";
import "./Editor.css";
import { formatWithRustfmt } from "./formatWithRustfmt";
import {
  colors,
  configuration,
  editorOptions,
  languageDef,
  rules,
} from "./setup";
import PrettierLogo from "/prettier.svg";

type IProps = { defaultValue: string; onChange: (value: string) => void };
type EditorType = monaco.editor.IStandaloneCodeEditor | null;

const CodeEditor: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const editorRef = React.useRef<EditorType>(null);

  //! Register Rust language
  // useRegisterRustLanguag e(editorRef);

  const handleEditorDidMount: OnMount = React.useCallback(
    async (editor, monaco) => {
      editorRef.current = editor;

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
      monaco.editor.defineTheme("rust-theme", {
        base: "vs-dark",
        inherit: true,
        rules: rules,
        colors: colors,
      });

      monaco.editor.setTheme("rust-theme");

      editor.onDidChangeModelContent(() => {
        //! propagate content changes to parent component
        const value = editor.getValue();
        onChange?.(value);
      });

      //! format default value on Editor mount
      try {
        const formattedCode = await formatWithRustfmt(defaultValue);
        editorRef.current.setValue(formattedCode);
      } catch (error) {
        console.error("Failed to format code:", error);
      }
    },
    [defaultValue]
  );

  //! Format the code using rustfmt
  const handleFormatCode = async () => {
    if (editorRef.current) {
      const code = editorRef.current.getValue();
      try {
        const formattedCode = await formatWithRustfmt(code);
        editorRef.current.setValue(formattedCode);
      } catch (error) {
        console.error("Failed to format code:", error);
      }
    }
  };

  return (
    <>
      <div className="editor-container has-code-toolbar">
        <RunButton onClick={handleFormatCode} logo={PrettierLogo} />
        <Editor
          height="67vh"
          theme="rust-theme"
          defaultLanguage="rust"
          defaultValue={defaultValue}
          options={editorOptions}
          onMount={handleEditorDidMount}
        />
      </div>
    </>
  );
};

export default CodeEditor;
