import { Request, Response, NextFunction }from 'express';
import { verifyJwt } from '../utils/jwt';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  console.log("Auth middleware triggered");
  const token = req.headers.cookie?.split('token=')[1] || req.headers.authorization?.split(' ')[1];
  if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
  }

  const decoded = verifyJwt(token) as { id: string } | null;
  if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
  }

  req.user = decoded; // Attach user info to request object
  next();
};