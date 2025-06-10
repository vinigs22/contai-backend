import "reflect-metadata";
import { DataSource } from "typeorm";
import { Transaction } from "./src/entities/Transaction";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST || "localhost",
  port: parseInt(process.env.PGPORT || "5432"),
  username: process.env.PGUSER || "vini",
  password: process.env.PGPASSWORD || "admin123",
  database: process.env.PGDATABASE || "suricato",
  synchronize: true, 
  logging: false,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
