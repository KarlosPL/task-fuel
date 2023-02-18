import express, { Router } from 'express';

const homeRouter: Router = express.Router();

homeRouter.get('/', (req, res) => {
    res.status(200).send('Hello world!');
});

export default homeRouter;
