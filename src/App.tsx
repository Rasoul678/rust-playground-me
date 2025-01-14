import "./App.css";
import RustCode from "./components/RustCode";
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
      <RustCode />
    </main>
  );
};

export default App;
