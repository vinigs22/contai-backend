import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { Transaction } from "../entities/Transaction";
import { z } from 'zod'

const transactionRepository = AppDataSource.getRepository(Transaction);

import { Between } from "typeorm";
import moment from "moment";

const transactionSchema = z.object({
  description: z.string({ required_error: "Description is required", invalid_type_error: "Description must be a string" }),
  amount: z.coerce.number({ required_error: "Value is required", invalid_type_error: "Value must be a number" }),
  paymentType: z.string({ required_error: "Payment type is required", invalid_type_error: "Payment type must be a string" }),
  transactionDate: z.string({required_error: "Date is required"}).date("Date must be a valid date")
});

export const getTransactionSummary = async (req: Request, res: Response) => {
  try {
    const dateSchema = z.object({
      month: z.coerce.number({ invalid_type_error: "Month - Invalid type" }),
      year: z.coerce.number({ invalid_type_error: "Year - Invalid type" }),
    });

    const parseResult = dateSchema.parse(req.query);

    const { month, year } = parseResult;

    const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    const transactions = await transactionRepository.find({
      where: {
        transactionDate: Between(startDate, endDate),
      },
    });

    let credit = 0;
    let debit = 0;

    transactions.forEach((t) => {
      if (t.paymentType.toLowerCase() === "credit") {
        credit += t.amount;
      } else if (t.paymentType.toLowerCase() === "debit") {
        debit += t.amount;
      }
    });

    const total = credit - debit;

    res.json({
      total: total / 100,
      credit: credit / 100,
      debit: debit / 100,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to get transaction summary" });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { month, year } = req.query;

    let transactions: Transaction[];

    if (month && year) {
      const startDate = moment(`${year}-${month}-01`).startOf("month").toDate();
      const endDate = moment(startDate).endOf("month").toDate();

      transactions = await transactionRepository.find({
        where: {
          transactionDate: Between(startDate, endDate),
        },
        order: {
          transactionDate: "DESC",
        },
      });
    } else {
      transactions = await transactionRepository.find({
        order: {
          transactionDate: "DESC",
        },
      });
    }

    const transactionsInReais = transactions.map(t => ({
      ...t,
      amount: t.amount / 100,
    }));

    res.json(transactionsInReais);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
};

export const createTransaction = async (req: Request, res: Response) => {

  try {
    const transaction = new Transaction();
    transactionSchema.parse(req.body)
    Object.assign(transaction, req.body);
    await transactionRepository.save(transaction);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const updateTransaction = async (req: Request, res: Response) => {

  try {
    transactionSchema.parse(req.body);
    const transaction = await transactionRepository.findOneBy({ id: req.params.id });
    if (!transaction) {
      res.status(404).json({ error: "Transaction not found" });
    }

    transactionRepository.merge(transaction, req.body);
    await transactionRepository.save(transaction);

    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const deleteTransaction = async (req: Request, res: Response) => {
  const result = await transactionRepository.delete(req.params.id);
  if (result.affected === 0) res.status(404).json({ error: "Transaction not found" });
  res.status(204).send();
};
