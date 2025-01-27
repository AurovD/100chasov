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
        const smsCode:string = `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;
        if (!phone) {
            return res.status(400).json({
                message: 'Номер телефона не указан',
            });
        }

        try {
            let oldUserRecords = await UserService.findCodes(phone);
            console.log(oldUserRecords, ";k;k");
            if(oldUserRecords.length === 0) {
                let newRecord = await UserService.createCode(phone, smsCode);
                console.log(newRecord);
            }
        } catch (err) {
            console.log(err);
        }

        return res.status(200).json({kjhl: "hi"});
    }
}
export default new UserController();