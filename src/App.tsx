import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import "./App.css";
import CodeSkeleton from "./components/code-skeleton";
import PreviewRunSkeleton from "./components/preview-run-skeleton/PreviewRunSkeleton";
import viteLogo from "/rust.svg";

const CodeEditor = lazy(() => import("./components/editor"));
const Preview = lazy(() => import("./components/preview"));

const App = () => {
  return (
    <main className="main">
      <div className="w-[7rem] m-auto">
        <a
          className="flex justify-center"
          href="https://www.rust-lang.org/"
          target="_blank"
        >
          <img src={viteLogo} className="logo rust" alt="Rust logo" />
        </a>
      </div>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-full md:w-[20rem] m-auto flex justify-around gap-4">
          <TabsTrigger value="preview" className="w-[50%]">
            preview
          </TabsTrigger>
          <TabsTrigger value="editor" className="w-[50%]">
            editor
          </TabsTrigger>
        </TabsList>
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
