import * as http from "http";
import "dotenv/config";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers/userController";

export const server = http.createServer(
  (req: http.IncomingMessage, res: http.ServerResponse) => {
    if (req.url === "/api/users" && req.method === "GET") {
      getUsers(req, res);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "GET"
    ) {
      const id = req.url.split("/")[3];
      getUserById(req, res, id);
    } else if (req.url === "/api/users" && req.method === "POST") {
      createUser(req, res);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "PUT"
    ) {
      const id = req.url.split("/")[3];
      updateUser(req, res, id);
    } else if (
      req.url &&
      req.url.match(/\/api\/users\/([0-9]+)/) &&
      req.method === "DELETE"
    ) {
      const id = req.url.split("/")[3];
      deleteUser(req, res, id);
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

const PORT: number = +process.env.PORT! || 4000;
process.env.PORT = String(PORT);

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
