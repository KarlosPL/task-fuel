import { Router, Request, Response } from 'express';
import uniqid from 'uniqid';
import bcrypt from 'bcrypt';
import { getDataPost } from '../db/database';
import { commonPasswords } from '../config/commonPasswords';

const registerRouter = Router();

interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

function validateRegisterForm(req: Request, res: Response, next: Function) {
  const { username, email, password }: User = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }

  if (commonPasswords.includes(password.toLowerCase())) {
    return res.status(400).json({ message: 'Password is too common or too simple' });
  }

  const lettersRegex = /[a-zA-Z]/;
  const numbersRegex = /[0-9]/;
  if (!lettersRegex.test(password) || !numbersRegex.test(password)) {
    return res.status(400).json({ message: 'Password must contain both letters and numbers' });
  }

  const bannedWords = ['admin', 'root', 'god'];
  if (bannedWords.includes(username.toLowerCase())) {
    return res.status(400).json({ message: 'Username is offensive or inappropriate' });
  }

  next();
}

registerRouter.post('/', validateRegisterForm, async (req: Request, res: Response) => {
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