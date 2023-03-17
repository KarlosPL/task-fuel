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
}

export default Task;