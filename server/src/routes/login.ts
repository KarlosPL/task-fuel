import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getDataPost } from '../db/database';
import authenticationJwtToken from '../middleware/authenticationJwtToken';
import generateJWT from '../middleware/jwtToken';

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
    .json({ mesage: 'Please fill all inputs to log in' });
    
    try {
    const users = await getDataPost('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Invalid password' });
    
    const token = generateJWT({ id: user.id, name: user.name });
    const decodedToken = authenticationJwtToken(token, process.env.ACCESS_TOKEN_SECRET as string);
    
    res.cookie('token', token, {
      httpOnly: true,
      // secure: true, 
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    if (decodedToken) res.redirect('dashboard');
    else console.log('Invalid token');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default loginRouter;
