import { Request, Response } from 'express';

export const home = (req: Request, res: Response): void => {
    res.status(200).send('Homepage!');
};
