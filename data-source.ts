import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "./src/entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "docker",
  password: process.env.DB_PASSWORD || "docker",
  database: process.env.DB_NAME || "suricato",
  synchronize: true, 
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
