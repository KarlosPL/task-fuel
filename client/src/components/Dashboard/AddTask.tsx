import React, { useState, ChangeEventHandler } from 'react';
import uniqid from 'uniqid';
import '../../assets/styles/Dashboard/AddTask.scss';

interface Task {
  taskId: string;
  task_name: string;
  description: string;
  date_created: string;
  deadline: string | null;
  status: string;
  priority: string;
  tags: string;
  reminder: string | null;
  isImportant: number;
}

interface Props {
  onAddTask: (newTask: Task) => void;
}

const AddTask: React.FC<Props> = ({ onAddTask }) => {
  const [task, setTask] = useState<Task>({
    taskId: `${uniqid()}`,
    task_name: '',
    description: '',
    date_created: '',
    deadline: null,
    status: 'To Do',
    priority: 'Low',
    tags: '',
    reminder: null,
    isImportant: 0,
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (task.task_name) {
      const newTask = { ...task, date_created: new Date().toISOString() };
      onAddTask(newTask);
      setTask({
        taskId: `${uniqid()}`,
        task_name: '',
        description: '',
        date_created: '',
        deadline: null,
        status: 'To Do',
        priority: 'Low',
        tags: '',
        reminder: null,
        isImportant: 0,
      });
    }
  };

  return (
    <form className="AddTaskForm" onSubmit={handleSubmit}>
      <label htmlFor="task_name">Task Name:</label>
      <input
        type="text"
        name="task_name"
        id="task_name"
        value={task.task_name}
        placeholder="Enter task name"
        onChange={handleInputChange}
        required
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        id="description"
        value={task.description}
        placeholder="Enter task description"
        onChange={handleInputChange}
      />

      <label htmlFor="deadline">Deadline:</label>
      <input
        type="datetime-local"
        name="deadline"
        id="deadline"
        value={task.deadline as string}
        onChange={handleInputChange}
      />

      <label htmlFor="status">Status:</label>
      <select
        name="status"
        id="status"
        value={task.status}
        onChange={handleSelectChange}
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
      </select>

      <label htmlFor="priority">Priority:</label>
      <select
        name="priority"
        id="priority"
        value={task.priority}
        onChange={handleSelectChange}
      >
        <option value="Low">Low</option>
        <option value="Normal">Normal</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="tags">Tags:</label>
      <input
        type="text"
        name="tags"
        id="tags"
        value={task.tags}
        placeholder="Enter task tags"
        onChange={handleInputChange}
      />

      <label htmlFor="reminder">Reminder:</label>
      <input
        type="datetime-local"
        name="reminder"
        id="reminder"
        value={task.reminder as string}
        onChange={handleInputChange}
      />

      <div className="important-collapse">
        <label htmlFor="isImportant">Is Important:</label>
        <input
          type="checkbox"
          name="isImportant"
          id="isImportant"
          checked={!!task.isImportant}
          onChange={(event) =>
            setTask((prevTask) => ({
              ...prevTask,
              isImportant: event.target.checked ? 1 : 0,
            }))
          }
        />
      </div>

      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
