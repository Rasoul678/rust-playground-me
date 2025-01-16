import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { lazy, Suspense } from "react";
import "./App.css";
import Preview from "./components/preview";
import { Skeleton } from "./components/ui/skeleton";
import viteLogo from "/rust.svg";

const CodeEditor = lazy(() => import("./components/editor"));

const App = () => {
  return (
    <main className="main">
      <div>
        <a
          className="flex justify-center"
          href="https://www.rust-lang.org/"
          target="_blank"
        >
          <img src={viteLogo} className="logo rust" alt="Rust logo" />
        </a>
      </div>
      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="w-[20rem] m-auto flex justify-around gap-4">
          <TabsTrigger value="preview" className="w-[50%]">
            preview
          </TabsTrigger>
          <TabsTrigger value="editor" className="w-[50%]">
            editor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
        <TabsContent value="editor">
          <Suspense fallback={<Skeleton className="h-[69vh] w-full" />}>
            <CodeEditor />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default App;
