import React from 'react';
import formatDateTime from '../../services/utils/formatDateTime';
import { TbTags } from 'react-icons/tb';
import { FcHighPriority, FcMediumPriority, FcLowPriority } from 'react-icons/fc';

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

const TaskDetails: React.FC<DisplayTaskProp> = ({ task }) => {
  const tags = task.tags.split(' ').map((tag, index) => (
    <span
      key={index}
      className="bg-blue-500 text-slate-100 px-3 py-0.5 rounded-md mx-1 whitespace-nowrap"
    >
      {tag}
    </span>
  ));

  const priority = (priority: string) => {
    if (priority === 'High') return <FcHighPriority className='w-7 h-auto' />
    else if (priority === 'Normal') return <FcMediumPriority className='w-7 h-auto' />
    else if (priority === 'Low') return <FcLowPriority className='w-7 h-auto' />
    else return;
  }

  return (
    <div
      className={
        'TaskDetail task_' +
        task.taskId +
        '_details bg-slate-100 flex flex-col absolute m-1px -bottom-full border rounded-b-lg border-t-2 border-t-sky-600 border-gray-500 border-solid w-15vw p-6 min-h-full'
      }
    >
      <h3 id="priority_and_description" className='my-3 flex gap-x-2'>{priority(task.priority)} {task.description}</h3>
      <p id="reminder">Reminder: {task.reminder === null ? <span>No reminder set</span> : task.reminder}</p>
      <p id="date_created">Created: {formatDateTime(task.date_created)}</p>
      <p id="tags" className='flex mt-3 flex-wrap gap-y-1'><TbTags className="w-7 h-auto" /> {tags.length > 1 && tags}</p>
    </div>
  );
};

export default TaskDetails;
