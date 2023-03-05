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

async function addDefaultTaskValues(userId: string) {
  const query = `INSERT INTO tasks (taskId, task_name, description, date_created, deadline, status, priority, category, tags, reminder, isImportant, userID)
                 VALUES (?, '', '', NOW(), NULL, 'To Do', 'Normal', '', '', NULL, FALSE, ?)`;
  const values = [uniqid(), userId];
  try {
    await getDataPost(query, values);
  } catch (err) {
    console.error(err);
  }
}

function validateRegisterForm(req: Request, res: Response, next: Function) {
  const { username, email, password }: User = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required', success: false });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email address', success: false });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: 'Password must be at least 8 characters long', success: false });
  }

  if (commonPasswords.includes(password.toLowerCase())) {
    return res
      .status(400)
      .json({ message: 'Password is too common or too simple', success: false });
  }

  const lettersRegex = /[a-zA-Z]/;
  const numbersRegex = /[0-9]/;
  if (!lettersRegex.test(password) || !numbersRegex.test(password)) {
    return res
      .status(400)
      .json({ message: 'Password must contain both letters and numbers', success: false });
  }

  const bannedWords = ['admin', 'root', 'god'];
  if (bannedWords.includes(username.toLowerCase())) {
    return res
      .status(400)
      .json({ message: 'Username is offensive or inappropriate', success: false });
  }

  next();
}

registerRouter.post(
  '/',
  validateRegisterForm,
  async (req: Request, res: Response) => {
    const { username, email, password }: User = req.body;

    const checkQuery = `SELECT COUNT(*) AS count FROM users WHERE username='${username}' OR email='${email}'`;
    const checkResult = await getDataPost(checkQuery);
    if (checkResult[0].count > 0)
      return res
        .status(409)
        .json({ message: 'Username or email already exists', success: false });

    const id = uniqid();
    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `INSERT INTO users (id, username, email, password) VALUES ('${id}', '${username}', '${email}', '${hashedPassword}')`;
    try {
      await getDataPost(insertQuery);
      await addDefaultTaskValues(id);
      return res.status(201).json({ message: 'User created successfully', success: true });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to create user', success: false });
    }
  }
);

export default registerRouter;
