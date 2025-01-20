import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { lazy, Suspense } from "react";
import "./App.css";
import CodeSkeleton from "./components/code-skeleton";
import PreviewRunSkeleton from "./components/preview-run-skeleton/PreviewRunSkeleton";
import { useCodeStore } from "./store";
import { getPlaygroundCrates } from "./utils";
import RustLogo from "/rust.svg";

const CodeEditor = lazy(() => import("./components/editor"));
const Preview = lazy(() => import("./components/preview"));

const App = () => {
  const { setCrates } = useCodeStore((state) => state);

  React.useEffect(() => {
    async function getCrates() {
      const data = await getPlaygroundCrates();
      setCrates(data.crates);
    }
    getCrates();
  }, []);

  return (
    <main className="main">
      <Tabs defaultValue="preview" className="w-full">
        <div className="flex justify-start items-center">
          <a
            className="flex justify-center w-16"
            href="https://www.rust-lang.org/"
            target="_blank"
          >
            <img src={RustLogo} className="logo rust" alt="Rust logo" />
          </a>
          <TabsList className="flex justify-around gap-4">
            <TabsTrigger value="preview" className="w-[50%]">
              preview
            </TabsTrigger>
            <TabsTrigger value="editor" className="w-[50%]">
              editor
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="preview">
          <Suspense fallback={<PreviewRunSkeleton />}>
            <Preview />
          </Suspense>
        </TabsContent>
        <TabsContent value="editor">
          <Suspense fallback={<CodeSkeleton />}>
            <CodeEditor />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default App;
