import { Request, Response }from 'express';
import db from "../config/db.config"

export const createTransaction = async (req: Request, res: Response) => {
  try{
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const { name, amount, categoryId, payMethodId, date } = req.body;
    if (!name || !amount || !categoryId || !payMethodId || !date) {
      return res.status(400).json({ error: "Missing required fields" }); 
    }
    try {
      const result = await db.query(
        "INSERT INTO transactions (name, amount, categoryId, payMethodId, date, \"userId\") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, amount, categoryId, payMethodId, date, userId]
      );
      return res.status(201).json(result.rows[0]);
    }
    catch (error) {
      console.error("Error creating transaction:", error);
      return res.status(400).json({ error: "Transaction already exists or invalid data" });
    }
  }
  catch (error) {
    console.error("Error creating transaction:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const transactionId = req.body.id;
    const result = await db.query(
      "DELETE FROM transactions WHERE id = $1 AND \"userId\" = $2 RETURNING *",
      [transactionId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getAllTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const result = await db.query(
      "SELECT * FROM transactions WHERE \"userId\" = $1 ORDER BY date DESC",
      [userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const editTransaction = async (req: Request, res: Response) => {
  try {
    if(!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const { id, name, amount, categoryId, payMethodId, date } = req.body;
    if (!id || !name || !amount || !categoryId || !payMethodId || !date) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const result = await db.query(
      "UPDATE transactions SET name = $1, amount = $2, categoryId = $3, payMethodId = $4, date = $5 WHERE id = $6 AND \"userId\" = $7 RETURNING *",
      [name, amount, categoryId, payMethodId, date, id, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    return res.status(200).json(result.rows[0]);
  }
  catch (error) {
    console.error("Error editing transaction:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}