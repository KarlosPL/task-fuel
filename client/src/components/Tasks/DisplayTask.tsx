import React, { useState } from 'react';
import axios from 'axios';
import { HiOutlineExclamation } from "react-icons/hi";
import { MdDoneOutline, MdDeleteOutline, MdStarOutline, MdOutlineAccessTime } from "react-icons/md";
import TaskDetails from './TaskDetails';
import TaskType from '../../types/TaskType';
import formatDateTime from '../../services/utils/formatDateTime';


interface DisplayTaskProp {
  task: TaskType;
}

const DisplayTask: React.FC<DisplayTaskProp> = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [important, setImportant] = useState(task.isImportant === 1 ? true : false);
  const [completed, setCompleted] = useState(task.status === "Completed" ? true : false);
  const [deleted, setDeleted] = useState(task.isDeleted === 1 ? true : false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  }

  const handleTaskAction = async (action: 'complete' | 'important' | 'delete') => {
    try {
      const token = localStorage.getItem('authorizationToken');
      const value = action === 'complete' ? !completed : action === 'important' ? important : !deleted;
      await axios.patch(`/api/task/${action}/${task.taskId}/${value}`, {
        [action === 'delete' ? 'isDeleted' : action === 'important' ? 'isImportant' : 'status']: action === 'delete' ? (value ? 1 : 0) : value
      }, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }
      });
  
      if (action === 'complete') {
        setCompleted(!completed);
      } else if (action === 'important') {
        setImportant(!important);
      } else if (action === 'delete') {
        setDeleted(!deleted);
      }
  
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div key={task.taskId} className={"Task task_" + task.taskId + " bg-slate-100 border rounded-lg border-gray-500 border-solid p-8 relative"}>
      <p id="status" className='text-green-500'>{task.status}</p>
      {task.isImportant === 1 ? <HiOutlineExclamation id="important" className='text-red-600 w-5 h-auto' /> : <p id="important"></p>}
      <h2 id="task_name">{task.task_name}</h2>
      <p id="deadline" className='mx-0 my-1'>{task.deadline === null ? <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> Today</span> : <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> {formatDateTime(task.deadline)}</span>}</p>
      {task.isDeleted === 0 && <button id="mark_as_done" className={task.status === "Completed" ? "border-green-500 col-span-full" : ""} onClick={() => handleTaskAction('complete')}><MdDoneOutline className={task.status === "Completed" ? "text-green-500" : ""} /></button>}
      {task.status !== 'Completed' && <button id="mark_as_deleted" className={task.isDeleted === 1 ? 'col-span-full' : ''} onClick={() => handleTaskAction('delete')}><MdDeleteOutline /></button>}
      {task.status !== 'Completed' && task.isDeleted === 0 && <button id="mark_as_important" className={task.isImportant === 1 ? "border-red-600" : ""} onClick={() => handleTaskAction('important')}><MdStarOutline className={task.isImportant === 1 ? "text-red-600" : ""} /></button>}
      <button id="show_details" onClick={handleDetailsClick}>Show Details</button>
      {showDetails && <TaskDetails task={task} />}
    </div>
  )
}

export default DisplayTask;
