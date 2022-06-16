import * as http from "http";
import {
  getUsers,
  getUserById,
  createUser,
} from "./controllers/userController";

const server = http.createServer(
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
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "Route not found" }));
    }
  }
);

const PORT: number = +process.env.PORT! || 4000;

server.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
