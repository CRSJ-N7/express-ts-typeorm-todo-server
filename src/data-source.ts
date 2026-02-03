import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Todo } from "./entities/Todo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "sergey",
  password: "12345",
  database: "mydb",
  synchronize: true,
  logging: false,
  entities: [User, Todo],
  migrations: [],
  subscribers: [],
});
