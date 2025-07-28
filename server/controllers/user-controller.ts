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

class UserController {
    async verifyCode (req: express.Request, res: express.Response): Promise<any> {

        try {
            const redisKey = `verify:${req.cookies['_33b54ef1-4db5-431c-88ad-8a7ff7956c5f']}`;
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


            console.log("everything is ok", isCodeValid);

            
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
            const redisKey = `verify:${phone}`;
            const existingCode = await redis.get(redisKey);


            console.log(existingCode, "reg")
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

            console.log(`Код для ${phone}: ${smsCode} (id: ${verificationId})`);

            res.status(200).cookie("_33b54ef1-4db5-431c-88ad-8a7ff7956c5f", verificationId, {
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