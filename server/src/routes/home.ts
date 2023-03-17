import { Request, Response, Router } from 'express';
import authenticateJwtToken from '../middleware/authenticationJwtToken';
import getUserTasks from '../middleware/getUserTasks';

const homeRouter: Router = Router();

homeRouter.get('/', authenticateJwtToken, async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const tasks = await getUserTasks(userId);
    res.status(200).json({ tasks, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
});


export default homeRouter;
