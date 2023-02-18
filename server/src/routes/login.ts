import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getDataPost } from '../db/database';

const loginRouter = express.Router();

interface User {
  email: string;
  password: string;
}

loginRouter.post('/', async (req: Request, res: Response) => {
  const { email, password }: User = req.body;

  if (!(email && password))
    return res
      .status(400)
      .json({ success: false, mesage: 'Please fill all inputs to log in' });

  try {
    const users = await getDataPost(
      `SELECT * FROM users WHERE email='${email}'`
    );

    if (users.length === 0) return res.status(401).send('Invalid email or password');

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).send('Invalid password');
    
    res.redirect('/api/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default loginRouter;
