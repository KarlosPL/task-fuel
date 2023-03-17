import express from 'express';
import { port } from './config';

// Routes
import homeRouter from './routes/home';
import loginRouter from './routes/login';
import newTaskRouter from './routes/newTask';
import pageNotFound from './routes/pageNotFound';
import registerRouter from './routes/register';
import tasksRouter from './routes/taskRouter';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/add-task', newTaskRouter);
app.use('/api/dashboard', homeRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/tasks/', tasksRouter);
app.use('*', pageNotFound);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});