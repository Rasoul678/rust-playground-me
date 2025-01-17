import { useCodeStore } from "@/store";
import React from "react";
import Spinner from "../spinner/Spinner";
import "./terminal.css";

type IProps = {
  onCargoRun?: (command: string) => void;
};

export type OutputType = {
  type: "error" | "success" | "info" | "command";
  text: string;
  command: string;
};

enum Commands {
  HELP = "help",
  ECHO = "echo ",
  CARGO = "cargo",
  CLEAR = "clear",
}

const MyTerminal: React.FC<IProps> = ({ onCargoRun }) => {
  const [input, setInput] = React.useState("");
  const { outputs, setOutputs, isRunning, setResult } = useCodeStore(
    (state) => state
  );

  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    }
  };

  const executeCommand = (command: string) => {
    if (!command) return;

    let newOutputs: OutputType[] = [
      ...outputs,
      { type: "command", text: command ? `» ${command}` : "", command },
    ];

    switch (command.trim()) {
      case Commands.HELP:
        newOutputs = [
          ...newOutputs,
          {
            type: "info",
            text: "Available commands:\n\t- help: display available commands.\n\t- clear: clear screen.\n\t- cargo [cmd]: run rust code\n\t- echo [text]: show some text on screen",
            command,
          },
        ];
        break;
      case Commands.CLEAR:
        newOutputs = [];
        setResult({ ok: false, message: "", output: "" });
        break;
      default:
        if (command.startsWith(Commands.ECHO)) {
          newOutputs = [
            ...newOutputs,
            { type: "success", text: command.slice(5), command },
          ];
        } else if (command.startsWith(Commands.CARGO)) {
          if (command === "cargo run") {
            onCargoRun?.(command);
          } else {
            newOutputs = [
              ...newOutputs,
              {
                type: "info",
                text: "Usage: cargo [cmd] \n\t- run [...] : build and run rust file.\n\t- format: apply formatter to code",
                command,
              },
            ];
          }
        } else {
          newOutputs = [
            ...newOutputs,
            { type: "error", text: `Command not found: ${command}`, command },
          ];
        }
        break;
    }
    setOutputs(newOutputs);
  };

  return (
    <div
      className="terminal"
      onClick={() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <div className="output">
        {outputs.map((line, index) => (
          <div key={index} className={line.type}>
            {line.text}
          </div>
        ))}
      </div>
      {!isRunning ? (
        <div className="input-line">
          <p>
            <span className="cyan md:hidden xl:inline">~/rust-playground</span>{" "}
            <span className="gold text-[1rem]">»</span>
          </p>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            className="input"
          />
        </div>
      ) : (
        <div className="flex justify-start items-center gap-1 ml-2">
          <Spinner className="w-5 h-5" />
          <h2 className="flex-1 text-left">running ...</h2>
        </div>
      )}
    </div>
  );
};

export default MyTerminal;
