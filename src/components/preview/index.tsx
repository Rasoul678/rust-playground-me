import React from "react";
import { usePrism } from "../../hooks";
import { getRustResult, RustResult } from "../../utils";
import { code } from "./code";
import RunLogo from "/run.svg";

type IProps = {};

const Preview: React.FC<IProps> = () => {
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<RustResult | null>(null);

  usePrism();

  const execute = async () => {
    setRunning(true);
    const result = await getRustResult(code);
    setResult(result);
    setRunning(false);
  };

  React.useEffect(() => {
    execute();
  }, []);

  return (
    <div>
      <pre className="line-numbers language-rust">
        <img
          onClick={execute}
          src={RunLogo}
          title="execute"
          className="logo run"
          alt="Run logo"
        />
        <code className="language-rust">{code}</code>
      </pre>
      <hr className="stdmsg stdout" />
      {running && <h3>Running...</h3>}
      {!running && (
        <div className="std-wrapper">
          <p>
            <span className="cyan">~/rust-playground</span>{" "}
            <span className="gold">»</span>{" "}
            <span className="greenyellow">cargo</span> run
          </p>
          {result?.output
            ?.split("\n")
            .filter(Boolean)
            .map((out) => {
              return (
                <p key={out}>
                  <span className="gold">»</span> {out}
                </p>
              );
            })}
        </div>
      )}
      <hr className="stdmsg stderr" />
      {!running && (
        <div className="std-wrapper">
          {result?.message?.split("\n").map((line) => {
            return (
              <p className="wood" key={line}>
                {line}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Preview;
