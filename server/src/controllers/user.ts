import { Request, Response }from 'express';
import db from "../config/db.config"
import bcrypt from 'bcryptjs';
export const getUserProfile = async (req: Request, res: Response) => {
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
// For username and email updates
export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const { username, email } = req.body;
    if (!username && !email) {
      return res.status(400).json({ error: "At least one field (username or email) is required" });
    }
    // Check if username or email already exists
    if (username) {
      const existingUser = await db.query("SELECT id FROM users WHERE LOWER(username) = LOWER($1) AND (id) <> ($2)", [username, userId]);
      if (existingUser.rows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }
    }
    if (email) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false) {
        return res.status(400).json({ error: "Invalid email format" });
      }
      const existingEmail = await db.query("SELECT id FROM users WHERE LOWER(email) = LOWER($1) AND (id) <> ($2) ", [email, userId]);
      if (existingEmail.rows.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    await db.query(
      "UPDATE users SET username = COALESCE($1, username), email = COALESCE($2, email) WHERE id = $3",
      [username, email, userId]
    );
    return res.status(200).json({ message: "Profile updated successfully" });
  }
  catch (error) {
    console.error("Error updating user profile:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: "Current password and new password are required" });
    }
    const result = await db.query("SELECT password FROM users WHERE id = $1", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, result.rows[0].password);
    if (!isMatch) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = $1 WHERE id = $2", [hashedPassword, userId]);
    return res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
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