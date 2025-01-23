import express from 'express';
import {User} from "../../types/user";
import login from "../../components/Forms/Login";
import UserService from "../services/user-service";


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
        const phone: string = req.body.phone;
        const smsCode = '1234';

        if (!phone) {
            return res.status(400).json({
                message: 'Номер телефона не указан',
            });
        }

        let code = await UserService.findCode(smsCode);
        console.log(code, "ljlj")

        return res.status(200).json({kjhl: "hi"});
    }
}
export default new UserController();