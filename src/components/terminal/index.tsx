import { useCodeStore } from "@/store";
import React from "react";
import Spinner from "../spinner/Spinner";
import "./terminal.css";

type IProps = {
  onCargoRun?: (command: string) => void;
};

export enum CommandType {
  ERROR = "error",
  SUCCESS = "success",
  INFO = "info",
  COMMAND = "command",
}

export type OutputType = {
  type: CommandType;
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
      {
        type: CommandType.COMMAND,
        text: command ? `» ${command}` : "",
        command,
      },
    ];

    switch (command.trim()) {
      case Commands.HELP:
        newOutputs = [
          ...newOutputs,
          {
            type: CommandType.INFO,
            text: "Available commands:\n\t- help: display available commands.\n\t- clear: clear screen.\n\t- cargo [cmd]: run rust code\n\t- echo [text]: show some text on screen",
            command,
          },
        ];
        break;
      case Commands.CLEAR:
        newOutputs = [];
        setResult({ result: "", error: null });
        break;
      default:
        if (command.startsWith(Commands.ECHO)) {
          newOutputs = [
            ...newOutputs,
            { type: CommandType.SUCCESS, text: command.slice(5), command },
          ];
        } else if (command.startsWith(Commands.CARGO)) {
          if (command === "cargo run") {
            onCargoRun?.(command);
          } else {
            newOutputs = [
              ...newOutputs,
              {
                type: CommandType.INFO,
                text: "Usage: cargo [cmd] \n\t- run [...] : build and run rust file.\n\t- format: apply formatter to code",
                command,
              },
            ];
          }
        } else {
          newOutputs = [
            ...newOutputs,
            {
              type: CommandType.ERROR,
              text: `Command not found: ${command}`,
              command,
            },
          ];
        }
        break;
    }
    setOutputs(newOutputs);
  };

  return (
    <div
      className="terminal custom-scrollbar"
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
