import express from 'express';
import {User} from "../../types/user";


declare module 'express' {
    interface Request {
        body:Pick<User, 'phone'>
    }
}

class UserController {
    async activate (req: express.Request, res: express.Response): Promise<any> {
        return res.status(200).json({kjhl: "hi"});
    }
    async code (req: express.Request, res: express.Response): Promise<any> {
        return res.status(200).json({kjhl: "hi"});
    }
}
export default new UserController();