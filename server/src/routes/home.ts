import { Router } from 'express';

const homeRouter: Router = Router();

homeRouter.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

export default homeRouter;
