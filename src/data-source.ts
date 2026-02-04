import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Todo } from "./entities/Todo";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: process.env.PORT ? parseInt(process.env.PORT) : 5432,
  username: process.env.USERNAME || "sergey",
  password: process.env.PASSWORD || "12345",
  database: process.env.DATABASE || "mydb",
  synchronize: false,
  logging: false,
  entities: [User, Todo],
  migrationsTableName: "fucking_migrations",
  migrations: [__dirname + "/migrations/**/*{.js,.ts}"],
  subscribers: [],
});
