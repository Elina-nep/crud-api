import fs from "fs";
import * as http from "http";
import { fileURLToPath } from "url";
import * as path from "path";
import { IPostUser, IUser } from "./types/user";

export const writeDataToFile = (filename: string, content: IUser[]) => {
  const resolvedPath = path.resolve(filename);
  const writeInFileStream = fs.createWriteStream(resolvedPath);
  console.log(resolvedPath);
  writeInFileStream.write(JSON.stringify(content));
  writeInFileStream.close();
  writeInFileStream.on("error", (err) => {
    console.log(err);
  });
};

export const getPostData: (req: http.IncomingMessage) => Promise<string> = (
  req: http.IncomingMessage
) => {
  return new Promise((res, rej) => {
    try {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        res(body);
      });
    } catch (err) {
      rej(err);
    }
  });
};
