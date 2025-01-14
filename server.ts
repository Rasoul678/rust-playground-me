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
        const data = (await req.json()) as { code: string };

        const result = await executeRustCode(data.code);

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

    // 404 Not Found
    return new Response("404 Not Found", { status: 404 });
  },
});

console.log(`Listening on http://localhost:${server.port}`);
