import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { useRegisterRustLanguage } from "../../hooks/useRegisterRustLanguage";
import { formatWithRustfmt } from "./formatWithRustfmt";
import { editorOptions } from "./setup";

type IProps = { defaultValue: string; onChange: (value: string) => void };
type EditorType = monaco.editor.IStandaloneCodeEditor | null;

const CodeEditor: React.FC<IProps> = ({ defaultValue, onChange }) => {
  const editorRef = React.useRef<EditorType>(null);

  //! Register Rust language
  useRegisterRustLanguage(editorRef);

  const handleEditorDidMount: OnMount = React.useCallback(
    async (editor) => {
      editorRef.current = editor;

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
      <button onClick={handleFormatCode} style={{ marginTop: "10px" }}>
        Format Code
      </button>
      <Editor
        height="67vh"
        theme="vs-dark"
        defaultLanguage="rust"
        defaultValue={defaultValue}
        options={editorOptions}
        onMount={handleEditorDidMount}
      />
    </>
  );
};

export default CodeEditor;
