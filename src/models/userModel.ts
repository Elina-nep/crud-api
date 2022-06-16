import { v4 as uuidv4 } from "uuid";
import fs from "fs";
// import { users } from "../data/users";
import users from "../data/users.json";
import { IPostUser, IUser } from "../types/user";
import { writeDataToFile } from "../utils";

// const users = JSON.parse(
//   fs.readFile('./data/user.json')
// );

// const users: IUser[] = JSON.parse(
//   import("../data/user.json", { assert: { type: "json" } }).toString()
// );

export const findAll: () => Promise<IUser[]> = () => {
  return new Promise((res, rej) => {
    res(users);
  });
};

export const findById: (arg0: string) => Promise<IUser> = (id) => {
  return new Promise((res, rej) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      res(user);
    }
  });
};

export const create: (arg0: IPostUser) => Promise<IUser> = (user) => {
  return new Promise((res, rej) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile("src/data/users.json", users);
    res(newUser);
  });
};
