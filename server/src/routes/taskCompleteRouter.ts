import { Request, Response, Router } from 'express';
import getDataPost  from '../db/database';

const taskCompleteRouter: Router = Router({ mergeParams: true });

taskCompleteRouter.patch('/:id/:value', async (req: Request, res: Response) => {
  try {
    const { id, value } = req.params;

    const updatedValue = value === "true" ? "Completed" : "To Do";

    console.log(id, value, updatedValue);

    const query = 'UPDATE tasks SET status = ? WHERE taskId = ?';
    const values = [updatedValue, id];

    const result = await getDataPost(query, values);
    if (result.affectedRows === 0) return res.status(404).send({ message: 'Task not found' });
    
    res.status(200).send({ message: 'Task set important successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while set important task' });
  }
});

export default taskCompleteRouter;
