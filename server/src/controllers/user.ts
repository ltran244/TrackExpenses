import { Request, Response }from 'express';
import db from "../config/db.config"

export const getUserProfile = async (req: Request, res: Response) => {
  console.log("Fetching user profile");
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await db.query("SELECT id, username, email FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not founds" });
    }
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return res.status(200).json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}