import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const PORT = process.env.PORT || 5001;
const HOST = process.env.HOST || "127.0.0.1";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("wisp server running");
});

// Every websocket upgrade is handed to the Wisp server, so any path works
// (ws://localhost:5001/wisp/, ws://localhost:5001/wi/, ...).
server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

server.listen(PORT, HOST, () => {
  console.log(`Wisp server listening on ws://${HOST}:${PORT}/wisp/`);
});
