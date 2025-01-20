import { CrateType } from "@/store";

export type RustResult = {
  result: string;
  error: string | null;
};

export const runRustCode = async (code: string): Promise<RustResult> => {
  // TODO: add ability to run code on a specific options
  const params = {
    version: "stable",
    mode: "debug",
    optimize: "0",
    code,
    edition: "2021",
  };

  try {
    const response = await fetch_with_timeout(
      "https://play.rust-lang.org/evaluate.json",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
        body: JSON.stringify(params),
      }
    );

    const result: RustResult = await response.json();
    return result;
  } catch (error) {
    throw new Error("Playground Communication: " + (error as Error).message);
  }
};

type CratesResultType = {
  crates: CrateType[];
};

export const getPlaygroundCrates = async (): Promise<CratesResultType> => {
  try {
    const response = await fetch_with_timeout(
      "https://play.rust-lang.org/meta/crates",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        mode: "cors",
      }
    );

    const result: CratesResultType = await response.json();
    return result;
  } catch (error) {
    throw new Error("Playground Communication: " + (error as Error).message);
  }
};

const fetch_with_timeout = (
  url: string | URL,
  options: RequestInit,
  timeout = 5000
): Promise<Response> => {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("timeout")), timeout)
    ),
  ]);
};
