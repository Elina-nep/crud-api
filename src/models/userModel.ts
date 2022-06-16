import { v4 as uuidv4 } from "uuid";
import { users } from "../data/users";
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
    const newUser = { ...user, id: uuidv4() };
    users.push(newUser);
    writeDataToFile("src/data/user.json", users);
    res(newUser);
  });
};
