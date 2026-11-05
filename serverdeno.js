import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "0.0.0.0";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("wisp server running");
});

// Every websocket upgrade is handed to the Wisp server, so any path works
// (ws://localhost:5001/wisp/, ws://localhost:5001/wi/, ...).
server.on("upgrade", (req, socket, head) => {
  // Some runtimes (e.g. Deno Deploy) return null from socket.address(), which
  // makes wisp-js crash while logging the client IP. Give it a safe fallback.
  const realAddress = socket.address?.bind(socket);
  socket.address = () =>
    realAddress?.() ?? { address: "0.0.0.0", family: "IPv4", port: 0 };
  wisp.routeRequest(req, socket, head);
});

server.listen(PORT, HOST, () => {
  console.log(`Wisp server listening on ws://${HOST}:${PORT}/wisp/`);
});
