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

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  }

  const handleDeleteClick = async () => {
    console.log("Deleted!", task.taskId);

    const confirmed = window.confirm("Are you sure you want to delete this task?");

    if (confirmed) {
      try {
        const token = localStorage.getItem('authorizationToken');
        await axios.patch(`/api/tasks/${task.taskId}`, {
          isDeleted: 1
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        });

        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div key={task.taskId} className={"Task task_" + task.taskId + " bg-slate-100 border rounded-lg border-gray-500 border-solid p-8 relative"}>
      <p id="status" className='text-green-500'>{task.status}</p>
      {task.isImportant === 1 ? <HiOutlineExclamation id="important" className='text-red-600 w-5 h-auto' /> : <p id="important"></p>}
      <h2 id="task_name">{task.task_name}</h2>
      <p id="deadline" className='mx-0 my-1'>{task.deadline === null ? <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> Today</span> : <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> {formatDateTime(task.deadline)}</span>}</p>
      <button id="mark_as_done"><MdDoneOutline /></button>
      <button id="mark_as_deleted" onClick={handleDeleteClick}><MdDeleteOutline /></button>
      <button id="mark_as_important"><MdStarOutline /></button>
      <button id="show_details" onClick={handleDetailsClick}>Show Details</button>
      {showDetails && <TaskDetails task={task} />}
    </div>
  )
}

export default DisplayTask;
