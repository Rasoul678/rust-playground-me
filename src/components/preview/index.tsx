import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { TerminalIcon } from "lucide-react";
import React from "react";
import { usePrism } from "../../hooks";
import { useCodeStore } from "../../store";
import { runRustCode } from "../../utils";
import PreviewRunSkeleton from "../preview-run-skeleton/PreviewRunSkeleton";
import RunButton from "../run-button/RunButton";
import MyTerminal, { CommandType } from "../terminal";
import { Card, CardHeader } from "../ui/card";

type IProps = {};

const Preview: React.FC<IProps> = () => {
  const {
    code,
    isHydrated,
    result,
    setResult,
    setOutputs,
    outputs,
    setIsRunning,
    edition,
    version,
    mode,
  } = useCodeStore((state) => state);
  const { toast } = useToast();

  usePrism(code);

  React.useEffect(() => {
    document.title = "Playground | Preview";
  }, []);

  const startExecutaion = async (command: string = "cargo run") => {
    setOutputs([
      ...outputs,
      { type: CommandType.COMMAND, text: `» ${command}`, command },
    ]);
    await execute();
  };

  const execute = async () => {
    // TODO: check for crates to be installed before running

    const CompilerOptions = {
      edition,
      version,
      mode,
    };

    try {
      setIsRunning(true);
      const data = await runRustCode(code, CompilerOptions);

      if (data.error) {
        const message = "Problem with executing your code.";
        toast({
          variant: "destructive",
          title: `Oh! ${message}`,
        });

        data.result = message + "\nPlease read compiler message below 👇";
        setResult(data, CommandType.ERROR);
      } else {
        setResult(data);
      }
    } catch (err) {
      const msg = (err as Error).message;
      toast({
        variant: "destructive",
        title: msg,
        action: (
          <ToastAction altText="Try again" onClick={() => startExecutaion()}>
            Try again
          </ToastAction>
        ),
      });
      setResult({ error: null, result: msg }, CommandType.ERROR);
    } finally {
      setIsRunning(false);
    }
  };

  // Show a loading state until the store is hydrated
  if (!isHydrated) {
    return <PreviewRunSkeleton />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-1">
      <pre className="line-numbers language-rust has-code-toolbar w-full md:w-[50%] lg:w-[60%] h-[50vh] md:h-[85vh] custom-scrollbar md:rounded-tr-none md:rounded-br-none">
        <RunButton onClick={() => startExecutaion()} />
        <code className="language-rust">{code}</code>
      </pre>
      <Card className="w-full md:w-[50%] lg:w-[40%] h-[30vh] md:h-[85vh] overflow-y-scroll custom-scrollbar md:rounded-tl-none md:rounded-bl-none">
        <CardHeader className="flex-row items-center gap-2 p-2">
          <TerminalIcon />
          <code className="text-[0.8rem]">
            type <span className="italic text-orange-500 font-bold">help</span>{" "}
            to see commands
          </code>
        </CardHeader>
        <MyTerminal onCargoRun={(command) => startExecutaion(command)} />
        <div className="std-wrapper h-[30%] p-2 overflow-y-scroll custom-scrollbar">
          {result?.error?.split("\n").map((line, idx) => {
            return (
              <p className="text-amber-300 text-[0.9rem]" key={idx + line}>
                {line}
              </p>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

export default Preview;
