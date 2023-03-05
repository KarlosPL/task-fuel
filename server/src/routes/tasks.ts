import { Request, Response, NextFunction, Router } from 'express';
import { getUserTasks } from '../middleware/getUserTasks';

const tasksRouter: Router = Router();

interface DecodedToken {
  id: string;
  name: string;
  user: {
    id: string;
    name: string;
  };
}

const extractUser = (
  req: Request & { decodedToken?: DecodedToken },
  res: Response,
  next: NextFunction
): void => {
  const decodedToken = req.decodedToken;
  if (decodedToken) {
    // req.user = decodedToken.user;
    next();
  } else {
    res.status(401).json({ message: 'Invalid token' });
  }
};

tasksRouter.get('/', extractUser, async (req: Request, res: Response) => {
  try {
    // const user = req.user;
    // const result = await getUserTasks(user.id);
    // res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

export default tasksRouter;