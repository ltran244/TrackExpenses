import { Request, Response, NextFunction }from 'express';
import { verifyJwt } from '../utils/jwt';

// export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
//   const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
//   if (!token) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const decoded = verifyJwt(token);
  
//   if (!decoded) {
//     return res.status(401).json({ error: "Invalid token" });
//   }

//   req. = decoded; // Attach user info to request object
//   next();
// }