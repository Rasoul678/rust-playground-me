import { Editor, OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";
import { useCodeStore } from "../../store";
import RunButton from "../run-button/RunButton";
import "./Editor.css";
import { formatWithRustfmt } from "./formatWithRustfmt";
import { editorOptions, setUpRust } from "./setup";
import PrettierLogo from "/prettier.svg";

type IProps = {};
type EditorType = monaco.editor.IStandaloneCodeEditor | null;

const CodeEditor: React.FC<IProps> = () => {
  const editorRef = React.useRef<EditorType>(null);
  const { code, setCode } = useCodeStore((state) => state);
  let timeout: ReturnType<typeof setTimeout>;

  const handleEditorDidMount: OnMount = React.useCallback((editor, monaco) => {
    editorRef.current = editor;

    // ! setup rust
    setUpRust(monaco);

    // ! format & save changes
    editor.onDidChangeModelContent(() => {
      const unformated = editor.getValue();
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        const formattedCode = await formatWithRustfmt(unformated);
        setCode(formattedCode);
      }, 500);
    });
  }, []);

  React.useEffect(() => {
    if (timeout) clearTimeout(timeout);
  }, []);

  //! format the code using rustfmt
  const handleFormatCode = async () => {
    if (editorRef.current) {
      const unformated = editorRef.current.getValue();
      try {
        const formattedCode = await formatWithRustfmt(unformated);
        editorRef.current.setValue(formattedCode);
      } catch (error) {
        console.error("Failed to format code:", error);
      }
    }
  };

  return (
    <>
      <div className="editor-container has-code-toolbar">
        <RunButton
          onClick={handleFormatCode}
          logo={PrettierLogo}
          alt="format"
        />
        <Editor
          height="69vh"
          theme="rust-theme"
          defaultLanguage="rust"
          defaultValue={code}
          options={editorOptions}
          onMount={handleEditorDidMount}
        />
      </div>
    </>
  );
};

export default CodeEditor;
