import express from 'express';
import {User} from "../../types/user";
import UserService from "../services/user-service";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import redis from '../../config/redis';


declare module 'express' {
    interface Request {
        body: Pick<User, 'phone' | 'code'>
    }
}


const cookie: '_33b54ef1-4db5-431c-88ad-8a7ff7956c5f' = '_33b54ef1-4db5-431c-88ad-8a7ff7956c5f';

class UserController {
    async delete (req: express.Request, res: express.Response): Promise<any> {
        await UserService.deleteUser(req.body.phone);
        return res.status(200).json({ success: true });
    }
    async verifyCode (req: express.Request, res: express.Response): Promise<any> {

        try {
            const redisKey = `verify:${req.cookies[cookie]}`;
            const redisData = await redis.get(redisKey);

            console.log(redisData, "code from redis");

            if (!redisData) {
                return res.status(400).json({ success: false, message: "Code not found" });
            }

            const { codeHash, phone } = JSON.parse(redisData);

            const isCodeValid = await bcrypt.compare(req.body.code ?? '', codeHash);
            if (!isCodeValid) {
                return res.status(400).json({ success: false, message: "Code is invalid" });
            }

            await redis.del(redisKey);
            await redis.del(`verify:${phone}`);



            let newUser = await UserService.createUser(phone);


            console.log("everything is ok", isCodeValid, newUser);




            
            return res.status(200).json({ success: true });
        } catch (err) {
            console.error("Ошибка при запросе кода:", err);
            res.status(500).json({ success: false, message: "Серверная ошибка" });
        }
    }

    async requestCode(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const phone: string = req.body.phone;


        if (!phone) {
            res.status(400).json({ success: false, message: "Phone is required" });
            return;
        }

        try {
            const redisKey:string  = `verify:${phone}`;
            const existingCode: string | null = await redis.get(redisKey);

            if (existingCode) {
                res.status(200).json({ success: true });
                return;
            }

            const smsCode = String(Math.floor(1000 + Math.random() * 9000)); 
            const codeHash = await bcrypt.hash(smsCode, 10);
            const verificationId = uuidv4();

            await redis.set(redisKey, JSON.stringify({
                verificationId,
            }), 'EX', 300);


            await redis.set(`verify:${verificationId}`, JSON.stringify({
                codeHash,
                phone
            }), 'EX', 300);

            console.log(`Код для ${phone}: ${smsCode}`);

            res.status(200).cookie(cookie, verificationId, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            }).json({ success: true });
        } catch (err) {
            console.error("Ошибка при запросе кода:", err);
            res.status(500).json({ success: false, message: "Серверная ошибка" });
        }
    }

}
export default new UserController();