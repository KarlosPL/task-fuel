import React, { useState } from 'react';
import { HiOutlineExclamation } from "react-icons/hi";
import { MdDoneOutline, MdDeleteOutline, MdStarOutline, MdOutlineAccessTime } from "react-icons/md";
import TaskDetails from './TaskDetails';
import formatDateTime from '../../services/utils/formatDateTime';

interface Task {
    taskId: number;
    task_name: string;
    description: string;
    date_created: string;
    deadline: string;
    status: string;
    priority: string;
    tags: string;
    reminder: string;
    isImportant: number;
}

interface DisplayTaskProp {
    task: Task;
}

const DisplayTask: React.FC<DisplayTaskProp> = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  }

  return (
    <div key={task.taskId} className={"Task task_" + task.taskId + " bg-slate-100 border rounded-lg border-gray-500 border-solid p-8 relative"}>
      <p id="status" className='text-green-500'>{task.status}</p>
      {task.isImportant === 1 ? <HiOutlineExclamation id="important" className='text-red-600 w-5 h-auto' /> : <p id="important"></p>}
      <h2 id="task_name">{task.task_name}</h2>
      <p id="deadline" className='mx-0 my-1'>{task.deadline === null ? <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> Today</span> : <span><MdOutlineAccessTime className='w-5 h-auto -my-1' /> {formatDateTime(task.deadline)}</span>}</p>
      <button id="mark_as_done"><MdDoneOutline /></button>
      <button id="mark_as_deleted"><MdDeleteOutline /></button>
      <button id="mark_as_important"><MdStarOutline /></button>
      <button id="show_details" onClick={handleDetailsClick}>Show Details</button>
      {showDetails && <TaskDetails task={task} />}
    </div>
  )
}

export default DisplayTask;
