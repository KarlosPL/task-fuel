import { Request, Response, Router } from 'express';
import getDataPost  from '../db/database';

const taskDeleteRouter: Router = Router({ mergeParams: true });

taskDeleteRouter.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const query = 'UPDATE tasks SET isDeleted = ? WHERE taskId = ?';
    const values = [1, id];

    const result = await getDataPost(query, values);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Task not found' });
    
    res.status(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while deleting task' });
  }
});

export default taskDeleteRouter;
