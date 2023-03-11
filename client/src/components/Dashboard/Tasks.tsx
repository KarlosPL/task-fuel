import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayTask from './DisplayTask';
import { MdOutlineAddBox } from 'react-icons/md';
import '../../assets/styles/Dashboard/Tasks.scss';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState([]);
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
        <h1>Today tasks</h1>
        <MdOutlineAddBox className='w-9 h-auto add-task' />
      </div>
      <div className="TasksContent">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks && tasks.length > 0 ? (
          <>
          {tasks.map((task: any) => (
            <DisplayTask task={task} />
            ))}
          </>
        ) : (
          <p>No tasks found</p>
        )}
      </div>
    </div>
  );
};

export default Tasks;
