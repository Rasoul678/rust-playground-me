import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import { TerminalIcon } from "lucide-react";
import React from "react";
import { usePrism } from "../../hooks";
import { useCodeStore } from "../../store";
import { getRustResult } from "../../utils";
import PreviewRunSkeleton from "../preview-run-skeleton/PreviewRunSkeleton";
import RunButton from "../run-button/RunButton";
import MyTerminal from "../terminal";
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
  } = useCodeStore((state) => state);
  const { toast } = useToast();

  usePrism(code);

  const startExecutaion = async (command: string = "cargo run") => {
    setOutputs([
      ...outputs,
      { type: "command", text: `» ${command}`, command },
    ]);
    await execute();
  };

  const execute = async () => {
    try {
      setIsRunning(true);
      const result = await getRustResult(code);

      if (!result.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Problem with executing your code.",
          action: (
            <ToastAction altText="Try again" onClick={() => startExecutaion()}>
              Try again
            </ToastAction>
          ),
        });
      }

      setResult(result);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Oh nooooo!",
        action: (
          <ToastAction altText="Try again" onClick={() => startExecutaion()}>
            Try again
          </ToastAction>
        ),
      });
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
      <pre className="line-numbers language-rust has-code-toolbar w-full md:w-[50%] lg:w-[65%] h-[50vh] md:h-[73vh]">
        <RunButton onClick={() => startExecutaion()} />
        <code className="language-rust">{code}</code>
      </pre>
      <Card className="w-full md:w-[50%] lg:w-[35%] h-[30vh] md:h-[73vh] overflow-y-scroll md:overflow-auto">
        <CardHeader className="flex-row items-center gap-2 p-2">
          <TerminalIcon />
          <code className="text-[0.8rem]">
            type <span className="italic text-orange-500 font-bold">help</span>{" "}
            to see commands
          </code>
        </CardHeader>
        <MyTerminal onCargoRun={(command) => startExecutaion(command)} />
        <div className="std-wrapper overflow-y-scroll p-2">
          {result?.message?.split("\n").map((line, idx) => {
            return (
              <p className="text-amber-300 text-[0.8rem]" key={idx + line}>
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
