import { Request, Response }from 'express';
import db from "../config/db.config"

export const createCategory = async (req: Request, res: Response) => {
  try{
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const { categoryName, color } = req.body;
    if (!categoryName) {
      return res.status(400).json({ error: "Category name is missing" });
    }
    try {
      if (!color) {
        await db.query(
        "INSERT INTO categories (\"userId\", name) VALUES ($1, $2)",
        [userId, categoryName]
      );
      }
      else{
        await db.query(
        "INSERT INTO categories (\"userId\", name, color) VALUES ($1, $2, $3)",
        [userId, categoryName, color]
      );
      }
      return res.status(201).json({ message: "Category created successfully" });
    }
    catch (error) {
      return res.status(400).json({ error: "Category already exists" });
    }
  }
  catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const categoryId = req.body.categoryId;
    if (!categoryId) {
      return res.status(400).json({ error: "Category ID is required" });
    }
    const result = await db.query("DELETE FROM categories WHERE id = $1 AND \"userId\" = $2", [categoryId, userId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await db.query("SELECT id, name, color FROM categories WHERE \"userId\" = $1", [userId]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const editCategory = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const categoryId = req.body.categoryId;
    const categoryName = req.body.categoryName;
    const color = req.body.color;
    if (!categoryId && !categoryName) {
      return res.status(400).json({ error: "Category ID or name are required" });
    }
    const result = await db.query(
      "UPDATE categories SET name = COALESCE($1, name), color = COALESCE($2, color) WHERE id = $3 AND \"userId\" = $4 RETURNING *",
      [categoryName, color, categoryId, userId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}