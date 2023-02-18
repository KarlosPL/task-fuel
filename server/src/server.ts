import express, { Request, Response } from 'express';
import { port } from './config';

// Routes
import homeRouter from './routes/home';
import loginRouter from './routes/login';
import registerRouter from './routes/register';

const app = express();

app.use(express.json());

app.use('/api/dashboard', homeRouter);
app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);

// app.get('*', (req: Request, res: Response) => {
//     res.status(404).send('<h2>Resource not found!</h2>');
// });

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});