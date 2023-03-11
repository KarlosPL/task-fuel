import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default function authenticateJwtToken ( req: Request, res: Response, next: NextFunction ): any {
  const token = process.env.ACCESS_TOKEN_SECRET as string;
  
  const authorizationHeader = req.headers['authorization'];
  const reqToken = authorizationHeader && authorizationHeader.split(' ')[1] as string;

  if (!token || !reqToken) return res.status(401).json({ message: 'Required parameters are not given', success: false });

  jwt.verify(reqToken, token, (err, user) => {
    if (err) return res.status(401).json({ success: false, errorContent: `Failed to authenticate JWT token: ${err}` });
    (req as any).user = user;
    next();
  });
}
