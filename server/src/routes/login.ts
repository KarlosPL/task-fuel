import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import generateJWT from '../middleware/jwtToken';
import getDataPost  from '../db/database';

const loginRouter: Router = Router();

interface User {
  email: string;
  password: string;
}

loginRouter.post('/', async (req: Request, res: Response) => {
  const { email, password }: User = req.body;
  
  if (!(email && password))
    return res.status(400).json({ mesage: 'Please fill all inputs to log in', success: false });
    
  try {
    const users = await getDataPost('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) 
      return res.status(401).json({ message: 'Invalid email or password', success: false });

    const user = users[0];
    
    const match = await bcrypt.compare(password, user.password);

    if (!match) 
      return res.status(401).json({ message: 'Invalid password', success: false });
    
    const token = generateJWT({ id: user.id, name: user.name });
    
    res.cookie('token', token, {
      httpOnly: true,
      sameSite: 'strict',
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    res.status(200).json({
      success: true,
      session: user.id,
      userData: { id: users[0].id, username: users[0].username, email: users[0].email },
      authorizationToken: token,
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
});

export default loginRouter;
