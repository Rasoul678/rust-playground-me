import { spawnSync } from "child_process";

/**
 * Formats Rust code using rustfmt.
 * @param code - The Rust code to format.
 * @returns The formatted Rust code.
 */
function formatWithRustfmt(code: string): string {
  // Spawn a rustfmt process
  const result = spawnSync("rustfmt", {
    input: code,
    encoding: "utf-8",
  });

  // Check for errors
  if (result.error) {
    throw new Error(`Failed to run rustfmt: ${result.error.message}`);
  }

  if (result.status !== 0) {
    throw new Error(`rustfmt failed: ${result.stderr}`);
  }

  // Return the formatted code
  return result.stdout;
}

const executeRustCode = async (code: string) => {
  const response = await fetch("https://play.rust-lang.org/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      channel: "stable",
      mode: "debug",
      edition: "2021",
      crateType: "bin",
      tests: false,
      code: code,
    }),
  });

  const result = await response.json();
  return result;
};
const server = Bun.serve({
  port: 8000,
  async fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/api/execute" && req.method === "POST") {
      try {
        const { code } = (await req.json()) as { code: string };

        const result = await executeRustCode(code);

        return new Response(
          JSON.stringify({
            output: result.stdout,
            message: result.stderr,
            ok: result.success,
          }),
          {
            headers: { "Content-Type": "application/json" },
          }
        );
      } catch (error) {
        return new Response("Invalid JSON data", { status: 400 });
      }
    }

    if (url.pathname === "/api/format" && req.method === "POST") {
      try {
        const { code } = await req.json();

        // Format the code using rustfmt
        const formattedCode = formatWithRustfmt(code);

        return new Response(JSON.stringify({ formattedCode }), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        return new Response(
          JSON.stringify({ error: "Failed to format code" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          }
        );
      }
    }

    // 404 Not Found
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
