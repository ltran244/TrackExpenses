import { Request, Response }from 'express';
import db from "../config/db.config"

export const createTransaction = async (req: Request, res: Response) => {
  try{
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const { name, amount, categoryId, payMethodId, date } = req.body;
    if (!name || !amount || !categoryId || !payMethodId) {
      return res.status(400).json({ error: "Missing required fields" }); 
    }
    if (!date) {
      const result = await db.query(
      "INSERT INTO transactions (name, amount, \"categoryId\", \"payMethodId\", \"userId\") VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, amount, categoryId, payMethodId, userId]
      );
      return res.status(201).json(result.rows[0]);
    }
    else {
      const result = await db.query(
        "INSERT INTO transactions (name, amount, \"categoryId\", \"payMethodId\", \"userId\", date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, amount, categoryId, payMethodId, userId, date]
      );
      return res.status(201).json(result.rows[0]);
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

export const getTransactions = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    let query = "SELECT *, SUM()FROM transactions WHERE \"userId\" = $1";
    let params = [userId];
    const {categoryId, payMethodId, startDate, endDate, sortOrder, sortBy} = req.query;
    if (categoryId) {
      query += ` AND "categoryId" = $${params.length + 1}`;
      params.push(categoryId as string);
    }
    if (payMethodId) {
      query += ` AND "payMethodId" = $${params.length + 1}`;
      params.push(payMethodId as string);
    }
    if (startDate) {
      query += ` AND date >= $${params.length + 1}`;
      params.push(new Date(startDate as string).toISOString());
    }
    if (endDate) {
      query += ` AND date <= $${params.length + 1}`;
      params.push(new Date(endDate as string).toISOString());
    }
    if (sortBy){
      const validSortByFields = ['name', 'amount', 'date'];
      if (!validSortByFields.includes(sortBy as string)) {
        return res.status(400).json({ error: "Invalid sort field" });
      }
      query += ` ORDER BY ${sortBy} ${sortOrder === 'DESC' ? 'DESC' : 'ASC'}`;
    }
    const result = await db.query(
      query, params
    );
    const totalPrice = 0;
    return res.status(200).json({items: result.rows, totalPrice: totalPrice});
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
      "UPDATE transactions SET name = $1, amount = $2, \"categoryId\" = $3, \"payMethodId\" = $4, date = $5 WHERE id = $6 AND \"userId\" = $7 RETURNING *",
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