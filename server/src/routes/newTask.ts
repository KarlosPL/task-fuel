import { Request, Response, Router } from 'express';
import authenticateJwtToken from '../middleware/authenticationJwtToken';
import { getDataPost } from '../db/database';

const newTaskRouter: Router = Router();

newTaskRouter.post('/', authenticateJwtToken, async (req: Request, res: Response) => {
  try {
    const newTask = req.body;
    const userID = (req as any).user.id;
    
    const taskWithIds = {
      userID: userID,
      ...newTask,
    };

    await getDataPost('INSERT INTO tasks SET ?', taskWithIds);
    res.status(200).send('Task saved to database');
  } catch (error) {
    console.error(error);
    res.status(400).send('Incorrect data format');
  }
});

export default newTaskRouter;
