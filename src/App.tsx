import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import "./App.css";
import CodeEditor from "./components/editor";
import Preview from "./components/preview";
import viteLogo from "/rust.svg";

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
            Preview
          </TabsTrigger>
          <TabsTrigger value="editor" className="w-[50%]">
            Editor
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <Preview />
        </TabsContent>
        <TabsContent value="editor">
          <CodeEditor />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default App;
