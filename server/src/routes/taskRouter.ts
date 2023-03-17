import { Request, Response, Router } from 'express';
import { getDataPost } from '../db/database';

const tasksRouter: Router = Router({ mergeParams: true });

tasksRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE tasks SET isDeleted = ? WHERE taskId = ?';
    const values = [1, id];
    await getDataPost(query, values);
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error deleting task' });
  }
});

export default tasksRouter;
