import init, { format_rust_code } from "../../../rustfmt-wasm/rustfmt_wasm";

/**
 * Formats Rust code using a backend API.
 * @param code - The Rust code to format.
 * @returns A promise that resolves with the formatted Rust code.
 */
export const formatRustCodeAsync = async (code: string): Promise<string> => {
  try {
    const response = await fetch("/api/format", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error("Failed to format code");
    }

    const data = await response.json();
    return data.formattedCode;
  } catch (error) {
    console.error("Error formatting code:", error);
    throw error;
  }
};

export const formatRustCodeWasm = async (code: string): Promise<string> => {
  await init();

  try {
    const formattedCode = format_rust_code(code);
    return formattedCode;
  } catch (e) {
    console.error("Error formatting code:", e);
    throw e;
  }
};
