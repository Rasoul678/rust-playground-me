export type RustResult = {
  output: string;
  message: string;
  ok: boolean;
};

export const getRustResult = async (code: string): Promise<RustResult> => {
  const response = await fetch("/api/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  });

  const result = await response.json();
  return result;
};
