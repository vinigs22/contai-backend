import { Router } from "express";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getTransactionSummary,
} from "../controllers/transactionsController"; 

const transactionsRoutes = Router();

transactionsRoutes.get("/", getTransactions);
transactionsRoutes.post("/", createTransaction);
transactionsRoutes.put("/:id", updateTransaction);
transactionsRoutes.delete("/:id", deleteTransaction);
transactionsRoutes.get("/summary", getTransactionSummary); 

export default transactionsRoutes;