import { connection } from '../db/connection';

interface Task {
  taskId: string;
  task_name: string;
  description: string;
  date_created: string;
  deadline: string | null;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Normal' | 'High';
  tags: string;
  reminder: string | null;
  isImportant: number;
  isDeleted: number;
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

export default getUserTasks;