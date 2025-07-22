import { Request, Response }from 'express';
import db from "../config/db.config"

export const createPayMethod = async (req: Request, res: Response) => {
  try {
    const { userId, methodName } = req.body;
    if (!userId || !methodName) {
      return res.status(400).json({ error: "User ID and method name are required" });
    }
    
    // Insert new payment method into the database
    const result = await db.query(
      "INSERT INTO payment_methods (user_id, method_name) VALUES ($1, $2) RETURNING *",
      [userId, methodName]
    );
    
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}