import { Request, Response }from 'express';
import db from "../config/db.config"
import bcrypt from 'bcryptjs';
import { signJwt } from '../utils/jwt';

export const login = async (req: Request, res: Response) => {
  try{
    const name = req.body.name as string;
    const password = req.body.password as string;
    if (!name || !password) {
      return res.status(400).json({ error: "Login request without name or password" });
    }
    // Check if user exists
    const result = await db.query("SELECT * FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($1)", [name]);
    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid email/username or password" });
    }
    if (!await bcrypt.compare(password, result.rows[0].password)) {
      return res.status(401).json({ error: "Invalid email/username or password" });
    }
    const token = signJwt({ id:result.rows[0].id,});
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });
    // Successful login
    return res.status(200).json({ message: "Login successful" });
  }
  catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const register = async (req: Request, res: Response) => {
  try{
    const userName = req.body.userName as string;
    const email = req.body.email as string;
    const password = req.body.password as string;
    if (!userName || !email || !password) {
      return res.status(400).json({ error: "Register request missing data" });
    }
    // Check if username or email already exists
    const checkExist = await db.query("SELECT username, email FROM users WHERE LOWER(username) = LOWER($1) OR LOWER(email) = LOWER($2)", [userName, email]);
    const existingName = checkExist.rows.some((row) => row.username.toLowerCase() === userName.toLowerCase());
    const existingEmail = checkExist.rows.some((row) => row.email.toLowerCase() === email.toLowerCase());
    const validAttempt = {
      invalidEmail: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) === false,
      emailError: existingEmail,
      nameError: existingName,
      passwordError: password.length < 8
    }
    if (validAttempt.emailError || validAttempt.nameError || validAttempt.invalidEmail || validAttempt.passwordError) {
      return res.status(400).json({ error: "Invalid registration attempt", details: validAttempt });
    }
    await db.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)",
      [userName, email, await bcrypt.hash(password, 10)]
    );
    return res.status(201).json({ message: "Account Successfully Registered" });
  }
  catch (error) {
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
    return res.status(500).json({ error: "Internal server error" });
  }
}

