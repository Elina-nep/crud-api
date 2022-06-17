import { v4 as uuidv4 } from "uuid";
import users from "../data/users.json";
import { IPostUser, IUser } from "../types/user";
import { writeDataToFile } from "../utils";

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

export const update: (arg0: IPostUser, arg1: string) => Promise<IUser> = (
  userData,
  id
) => {
  return new Promise((res, rej) => {
    const index = users.findIndex((user) => user.id === id);
    users[index] = { id, ...userData };
    writeDataToFile("src/data/users.json", users);
    res(users[index]);
  });
};

export const remove: (arg0: string) => Promise<void> = (id) => {
  return new Promise((res, rej) => {
    const updatedUsers = users.filter((user) => user.id !== id);

    writeDataToFile("src/data/users.json", updatedUsers);
    res();
  });
};
