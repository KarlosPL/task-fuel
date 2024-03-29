import { Request, Response, Router } from 'express';
import getDataPost from '../db/database';

const taskRouter: Router = Router({ mergeParams: true });

taskRouter.patch('/complete/:id/:value', async (req: Request, res: Response) => {
    try {
      const { id, value } = req.params;

      const updatedValue = value === 'true' ? 'Completed' : 'To Do';

      const query = 'UPDATE tasks SET status = ? WHERE taskId = ?';
      const values = [updatedValue, id];

      const result = await getDataPost(query, values);
      if (result.affectedRows === 0)
        return res.status(404).send({ message: 'Task not found' });

      res.status(200).send({ message: 'Task set important successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error while set important task' });
    }
  }
);

taskRouter.patch('/delete/:id/:value', async (req: Request, res: Response) => {
  try {
    const { id, value } = req.params;

    const updatedValue = value === 'true' ? 1 : 0;

    const query = 'UPDATE tasks SET isDeleted = ? WHERE taskId = ?';
    const values = [updatedValue, id];

    const result = await getDataPost(query, values);
    if (result.affectedRows === 0)
      return res.status(404).send({ message: 'Task not found' });

    res.status(200).send({ message: 'Task deleted/restored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Error while deleting/restoring task' });
  }
});

taskRouter.patch('/important/:id/:value', async (req: Request, res: Response) => {
    try {
      const { id, value } = req.params;

      const updatedValue = value === 'true' ? 0 : 1;

      console.log("imporatn ", id, updatedValue)

      const query = 'UPDATE tasks SET isImportant = ? WHERE taskId = ?';
      const values = [updatedValue, id];

      const result = await getDataPost(query, values);
      if (result.affectedRows === 0)
        return res.status(404).send({ message: 'Task not found' });

      res.status(200).send({ message: 'Task set important successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Error while set important task' });
    }
  }
);

export default taskRouter;
