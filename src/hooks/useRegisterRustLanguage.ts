import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import React from "react";

type editorRefType =
  React.MutableRefObject<monaco.editor.IStandaloneCodeEditor | null>;
export const useRegisterRustLanguage = (editorRef: editorRefType) => {
  React.useEffect(() => {
    // Cleanup on unmount
    return () => {
      editorRef.current?.dispose();
    };
  }, [editorRef.current]);
};
