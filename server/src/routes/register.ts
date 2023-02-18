import express, { Request, Response } from 'express';
import uniqid from 'uniqid';
import bcrypt from 'bcrypt';
import { getDataPost } from '../db/database';

const registerRouter = express.Router();

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

registerRouter.post('/', async (req: Request, res: Response) => {
  const { username, email, password }: User = req.body;

  const checkQuery = `SELECT COUNT(*) AS count FROM users WHERE username='${username}' OR email='${email}'`;
  const checkResult = await getDataPost(checkQuery);
  if (checkResult[0].count > 0) return res.status(409).json({ message: 'Username or email already exists' });

  const id = uniqid();
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertQuery = `INSERT INTO users (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${hashedPassword}')`;
  try {
    await getDataPost(insertQuery);
    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Failed to create user' });
  }
});

export default registerRouter;