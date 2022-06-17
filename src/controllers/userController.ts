import * as http from "http";
import * as Users from "../models/userModel";
import { IPostUser, IUser } from "../types/user";
import { getPostData } from "../utils";

export const getUsers = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  try {
    const users: IUser[] = await Users.findAll();
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const user: IUser = await Users.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies }: IPostUser = JSON.parse(body);

    const user: IPostUser = {
      username,
      age,
      hobbies,
    };

    const newUser: IUser = await Users.create(user);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const user: IUser = await Users.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      const body = await getPostData(req);
      const { username, age, hobbies }: IPostUser = JSON.parse(body);

      const userUpdated: IPostUser = {
        username: username || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      };

      const updUser: IUser = await Users.update(userUpdated, id);
      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify(updUser));
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteUser = async (
  req: http.IncomingMessage,
  res: http.ServerResponse,
  id: string
) => {
  try {
    const user: IUser = await Users.findById(id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end(JSON.stringify({ message: "User not found" }));
    } else {
      await Users.remove(id);
      res.writeHead(204, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: `User ${id} was removed` }));
    }
  } catch (err) {
    console.log(err);
  }
};
