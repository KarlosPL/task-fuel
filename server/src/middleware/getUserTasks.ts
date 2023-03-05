import { connection } from '../db/connection';

interface Task {
  taskId: string;
  task_name: string;
  description: string;
  date_created: string;
  deadline: string;
  status: 'To do' | 'In progress' | 'Completed';
  priority: 'low' | 'normal' | 'high' | 'critical';
  category: string;
  tags: string[];
  reminder: string;
  isImportant: boolean;
  userID: string;
}

const getUserTasks = (userID: string): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    connection.query(
      'SELECT * FROM tasks WHERE userID = ? ORDER BY deadline ASC',
      [userID],
      (err: any, results: any) => {
        if (err) reject(err);
        else resolve(results);
      }
    );
  });
};

export { getUserTasks };