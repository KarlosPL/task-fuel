import { Router, Request, Response } from "express";

const pageNotFound: Router = Router();

pageNotFound.get('/', (req: Request, res: Response) => {
    res.status(200).send("<h1>Page not found!</h1>");
});

export default pageNotFound;