import React from "react";
import { usePrism } from "../../hooks";
import { useCodeStore } from "../../store";
import { getRustResult, RustResult } from "../../utils";
import RunButton from "../run-button/RunButton";

type IProps = {};

const Preview: React.FC<IProps> = () => {
  const { code } = useCodeStore((state) => state);
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<RustResult | null>(null);

  usePrism(code);

  const execute = async () => {
    setRunning(true);
    const result = await getRustResult(code);
    setResult(result);
    setRunning(false);
  };

  React.useEffect(() => {
    // execute();
  }, []);

  return (
    <div>
      <pre className="line-numbers language-rust has-code-toolbar">
        <RunButton onClick={execute} />
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
            .map((out, idx) => {
              return (
                <p key={idx + out}>
                  <span className="gold">»</span> {out}
                </p>
              );
            })}
        </div>
      )}
      <hr className="stdmsg stderr" />
      {!running && (
        <div className="std-wrapper">
          {result?.message?.split("\n").map((line, idx) => {
            return (
              <p className="wood" key={idx + line}>
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
