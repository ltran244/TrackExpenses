import { Request, Response }from 'express';
import db from "../config/db.config"
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwt';

export const test = async ( req: Request, res: Response,) => {
  const result = await db.query("SELECT name FROM pgmigrations ");
  console.log("Used");
  return res.status(200).json(result.rows[0]);
};

export const login = async (req: Request, res: Response) => {
  try{
    const name = req.body.name as string;
    const password = req.body.password as string;
    if (!name || !password) {
      return res.status(400).json({ error: "Missing name or password" });
    }
    console.log("Login attempt with:", { name, password });
    // Check if user exists ()
    const result = await db.query("SELECT * FROM users WHERE username = $1 OR email = $1", [name]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email/username or password" });
    }
    if (!await bcrypt.compare(password, result.rows[0].password)) {
      return res.status(401).json({ error: "Invalid email/username or password" });
    }
    const token = signJwt({ id:result.rows[0].id });
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
      sameSite: 'strict', // Adjust as needed
      maxAge: 3600000 // 1 hour
    });
    // Successful login
    console.log("User logged in:", result.rows[0]);
    return res.status(200).json({ message: "Login successful" });
  }
  catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try{
    const userName = req.body.userName as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    if (!userName || !email || !password) {
      return res.status(400).json({ error: "Missing something" });
    }
    // Check if username or email already exists
    const checkExist = await db.query("SELECT username, email FROM users WHERE username = $1 OR email = $2", [userName, email]);
    const existingName = checkExist.rows.some((row) => row.username === userName);
    const existingEmail = checkExist.rows.some((row) => row.email === email);
    const validAttempt = {
      invalidEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false,
      emailError: existingEmail,
      nameError: existingName,
      passwordError: password.length < 8
    }
    if (validAttempt.emailError || validAttempt.nameError || validAttempt.invalidEmail || validAttempt.passwordError) {
      return res.status(400).json({ error: "Invalid registration attempt", details: validAttempt });
    }
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [userName, email, await bcrypt.hash(password, 10)]
    );
    return res.status(201).json({ message: "Account Successfully Registered" });
  }
  catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    console.log(req);
    const userId = req.params.id;
    console.log("Delete user attempt with ID:", userId);
    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }
    const result = await db.query("DELETE FROM users WHERE id = $1 RETURNING *", [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not founds" });
    }
    return res.status(200).json({ message: "User deleted successfully", user: result.rows[0] });
  } catch (error) {
    console.error("Error during user deletion:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
