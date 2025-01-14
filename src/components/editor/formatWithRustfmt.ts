/**
 * Formats Rust code using a backend API.
 * @param code - The Rust code to format.
 * @returns A promise that resolves with the formatted Rust code.
 */
export const formatWithRustfmt = async (code: string): Promise<string> => {
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
