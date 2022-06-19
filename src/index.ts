import * as http from "http";
import cluster from "node:cluster";
import { cpus } from "node:os";
import "dotenv/config";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController";
import { Users } from "./models/userModel";

export const users = Users.Instance;

export const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === "/api/users" && req.method === "GET") {
      getUsers(req, res, users);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([a-z0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      getUserById(req, res, id, users);
    } else if (req.url === "/api/users" && req.method === "POST") {
      createUser(req, res, users);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([a-z0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      updateUser(req, res, id, users);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([a-z0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      deleteUser(req, res, id, users);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

const PORT: number = +process.env.PORT! || 4000;
process.env.PORT = String(PORT);

if (process.argv.includes("--multi")) {
  const numCPUs = cpus().length;
  if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {
    server.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });
    console.log(`Worker ${process.pid} started`);
  }
} else {
  server.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
}
