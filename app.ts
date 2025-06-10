import 'dotenv/config';
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./data-source";
import transactionsRoutes from "./src/routes/transactionsRoutes";

const app = express();
const cors = require('cors');

app.use(cors({
  origin: 'https://contai-three.vercel.app'
}));
app.use(express.json());

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");

    app.use("/transactions", transactionsRoutes);

    app.get("/", (req: Request, res: Response) => {
      res.send("API OK!");
    });

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      console.error("Unexpected error:", err);
      res.status(500).json({
        error: "Internal server error",
        message: err.message,
      });
    });

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

startServer();
