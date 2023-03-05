import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
      axios.post('/api/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);
  
  return (
    <div className='Tasks'>
        <h1>Tasks</h1>
        <ul>
        {tasks.map((task: any) => (
            <li key={task.id}>
            <h2>{task.task_name}</h2>
            <p>{task.description}</p>
            <p>{task.deadline}</p>
            <p>{task.priority}</p>
            <p>{task.status}</p>
            </li>
        ))}
        </ul>
  </div>
  )
}

export default Tasks;