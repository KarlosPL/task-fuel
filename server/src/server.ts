import express, { Request, Response } from 'express';
import { port } from './config';

// Routes
import homeRouter from './routes/home';
import loginRouter from './routes/login';
import registerRouter from './routes/register';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dashboard', homeRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});