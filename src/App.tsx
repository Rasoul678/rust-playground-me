import "./App.css";
import CodeEditor from "./components/editor";
import Preview from "./components/preview";
import { code } from "./components/preview/code";
import viteLogo from "/rust.svg";

const App = () => {
  return (
    <main className="main">
      <div>
        <a href="https://www.rust-lang.org/" target="_blank">
          <img src={viteLogo} className="logo rust" alt="Rust logo" />
        </a>
      </div>
      <h1>Rust Playground</h1>
      <CodeEditor
        defaultValue={code}
        onChange={(value) => console.log(value)}
      />
      <Preview />
    </main>
  );
};

export default App;
