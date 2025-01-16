import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { usePrism } from "../../hooks";
import { useCodeStore } from "../../store";
import { getRustResult, RustResult } from "../../utils";
import PreviewRunSkeleton from "../preview-run-skeleton/PreviewRunSkeleton";
import RunButton from "../run-button/RunButton";
import { Card } from "../ui/card";

type IProps = {};

const Preview: React.FC<IProps> = () => {
  const { code, isHydrated } = useCodeStore((state) => state);
  const [running, setRunning] = React.useState(false);
  const [result, setResult] = React.useState<RustResult | null>(null);
  const { toast } = useToast();

  usePrism(code);

  const execute = async () => {
    try {
      setRunning(true);
      const result = await getRustResult(code);

      if (!result.ok) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Problem with executing your code.",
          action: (
            <ToastAction altText="Try again" onClick={execute}>
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
          <ToastAction altText="Try again" onClick={execute}>
            Try again
          </ToastAction>
        ),
      });
    } finally {
      setRunning(false);
    }
  };

  React.useEffect(() => {
    if (!isHydrated) return;
    execute();
  }, [code, isHydrated]);

  // Show a loading state until the store is hydrated
  if (!isHydrated) {
    return <PreviewRunSkeleton />;
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-1">
      <pre className="line-numbers language-rust has-code-toolbar w-full md:w-[50%] lg:w-[65%] h-[50vh] md:h-[73vh]">
        <RunButton onClick={execute} />
        <code className="language-rust">{code}</code>
      </pre>
      <Card className="w-full md:w-[50%] lg:w-[35%] h-[30vh] md:h-[73vh] overflow-y-scroll md:overflow-auto">
        {running && (
          <div className="w-full h-full flex justify-center items-center">
            <h2>Running...</h2>
          </div>
        )}
        {!running && (
          <div className="std-wrapper h-[67%] overflow-y-scroll p-2">
            <p>
              <span className="cyan">~/rust-playground</span>{" "}
              <span className="gold">»</span>{" "}
              <span className="greenyellow">cargo</span> run main.rs
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
        {!running && (
          <div className="std-wrapper overflow-y-scroll p-2">
            <hr className="stdmsg stderr w-full" />
            {result?.message?.split("\n").map((line, idx) => {
              return (
                <p className="wood" key={idx + line}>
                  {line}
                </p>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
};

export default Preview;
