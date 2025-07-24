import { Request, Response }from 'express';
import db from "../config/db.config"

export const createPayMethod = async (req: Request, res: Response) => {
  try {
    console.log("Creating payment method");
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const method = req.body.method;
    const name = req.body.name;
    if (!method || !name) {
      return res.status(400).json({ error: "No method or name" });
    }
    if (method != "card" && method != "cash" && method != "other") {
      return res.status(400).json({ error: "Invalid method" });
    }
    // Insert new payment method into the database
    try {
      const result = await db.query(
        "INSERT INTO \"payMethods\" (\"userId\", method, name) VALUES ($1, $2, $3) RETURNING *",
        [userId, method, name]
      );
    return res.status(201).json(result.rows[0]);
    }
    catch (error) {
      console.error("Error creating payment method:", error);
      return res.status(400).json({ error: "Payment method already exists" });
    }
  } catch (error) {
    console.log("Error creating payment method:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deletePayMethod = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const payMethodId = req.body.id;
    // Delete payment method from the database
    const result = await db.query(
      "DELETE FROM \"payMethods\" WHERE id = $1 AND \"userId\" = $2 RETURNING *",
      [payMethodId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    return res.status(200).json({ message: "Payment method deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const getAllPayMethods = async (req: Request, res: Response) => {
  console.log("Retrieving payment methods");
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    console.log("User authenticated");
    const userId = req.user.id;
    // Retrieve payment methods for the user
    const result = await db.query(
      "SELECT * FROM \"payMethods\" WHERE \"userId\" = $1",
      [userId]
    );
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const editPayMethod = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    const payMethodId = req.body.id;
    const method = req.body.method;
    const name = req.body.name;
    if (!method && !name) {
      return res.status(400).json({ error: "No method or name provided" });
    }
    // Update payment method in the database
    const result = await db.query(
      "UPDATE \"payMethods\" SET method = COALESCE($1, method), name = COALESCE($2, name) WHERE id = $3 AND \"userId\" = $4 RETURNING *",
      [method, name, payMethodId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Payment method not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error editing payment method:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}