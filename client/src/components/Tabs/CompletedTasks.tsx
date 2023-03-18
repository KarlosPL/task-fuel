import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayTask from '../Tasks/DisplayTask';
import TaskType from '../../types/TaskType';
import '../../assets/styles/Dashboard/Tasks.scss';

const CompletedTasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authorizationToken');
        const response = await axios.get('/api/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setTasks(response.data.tasks);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="Tasks">
      <div className="TasksHeader flex items-center justify-between">
        <h1>Completed tasks</h1>
      </div>
      <div className="TasksContent relative">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks && tasks.length > 0 ? (
          <>
          {tasks.filter(e => e.status === 'Completed' && e.isDeleted === 0 && e.status === "Completed").map((task: any) => (
            <DisplayTask key={task.taskId} task={task} />
            ))}
          </>
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default CompletedTasks;
