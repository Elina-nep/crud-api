import { v4 as uuidv4 } from "uuid";
// import users from "../data/users.json";
import { IPostUser, IUser } from "../types/user";
import { writeDataToFile } from "../helpers/utils";

export class Users {
  private static _instance: Users;
  usersStorage: IUser[];

  private constructor() {
    this.usersStorage = [];
  }

  public static get Instance() {
    // Do you need arguments? Make it a regular static method instead.
    return this._instance || (this._instance = new this());
  }

  findAll: () => Promise<IUser[]> = () => {
    return new Promise((res, rej) => {
      res(this.usersStorage);
    });
  };

  findById: (arg0: string) => Promise<IUser> = (id) => {
    return new Promise((res, rej) => {
      const user = this.usersStorage.find((user) => user.id === id);
      if (user) {
        res(user);
      }
    });
  };

  create: (arg0: IPostUser) => Promise<IUser> = (user) => {
    return new Promise((res, rej) => {
      const newUser = { id: uuidv4(), ...user };
      this.usersStorage.push(newUser);
      // writeDataToFile("src/data/users.json", this.usersStorage);
      res(newUser);
    });
  };

  update: (arg0: IPostUser, arg1: string) => Promise<IUser> = (
    userData,
    id
  ) => {
    return new Promise((res, rej) => {
      const index = this.usersStorage.findIndex((user) => user.id === id);
      this.usersStorage[index] = { id, ...userData };
      // writeDataToFile("src/data/users.json", this.usersStorage);
      res(this.usersStorage[index]);
    });
  };

  remove: (arg0: string) => Promise<void> = (id) => {
    return new Promise((res, rej) => {
      const updatedUsers = this.usersStorage.filter((user) => user.id !== id);
      this.usersStorage = updatedUsers;
      // writeDataToFile("src/data/users.json", updatedUsers);
      res();
    });
  };
}
