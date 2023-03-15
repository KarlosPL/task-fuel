import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayTask from './DisplayTask';
import { MdOutlineAddBox } from 'react-icons/md';
import AddTask from './AddTask';
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

  const [addTaskVisibility, setAddTaskVisibility] = useState(false);

  const handleAddTaskVisibility = () => {
    setAddTaskVisibility(!addTaskVisibility);
  }
  
  const addTask = async (newTaskForm: any) => {
    if (newTaskForm.task_name) {
      const token = localStorage.getItem('authorizationToken');
      await axios.post('/api/add-task', JSON.stringify({...newTaskForm}), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      })
      .catch(error => console.error(error));

      setAddTaskVisibility(false);
    }
  }

  return (
    <div className="Tasks">
      <div className="TasksHeader flex items-center justify-between">
        <h1>Today tasks</h1>
        <MdOutlineAddBox className='w-9 h-auto add-task' onClick={handleAddTaskVisibility} />
      </div>
      <div className="TasksContent relative">
        {isLoading ? (
          <p>Loading tasks...</p>
        ) : tasks && tasks.length > 0 ? (
          <>
          {tasks.map((task: any) => (
            <DisplayTask key={task.taskId} task={task} />
            ))}
          </>
        ) : (
          <p>No tasks found</p>
        )}

        {addTaskVisibility && <AddTask onAddTask={addTask} />}
      </div>
    </div>
  );
};

export default Tasks;
