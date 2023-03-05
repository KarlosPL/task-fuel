import { Request, Response, Router } from 'express';
import authenticateJwtToken from '../middleware/authenticationJwtToken';

const homeRouter: Router = Router();

homeRouter.get('/', authenticateJwtToken, (req: Request, res: Response) => {
    res.status(201).json({ success: true });
});

export default homeRouter;
