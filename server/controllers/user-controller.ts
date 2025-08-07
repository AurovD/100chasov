import express from 'express';
import {User} from "../../types/user";
import UserService from "../services/user-service";
import PassportService from "../services/passport-service";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import redis from '../../config/redis';
// import {ref} from "yup";


declare module 'express' {
    interface Request {
        body: Pick<User, 'phone' | 'code'>
    }
}


const cookie: string[] = ['_33b54ef1-4db5-431c-88ad-8a7ff7956c5f', "_979481d1-b1de-4242-9da0-b5cbd247c54a"];

class UserController {
    async delete (req: express.Request, res: express.Response): Promise<any> {
        await UserService.deleteUser(req.body.phone);
        return res.status(200).json({ success: true });
    }
    async verifyCode (req: express.Request, res: express.Response): Promise<any> {

        try {
            const redisKey = `verify:${req.cookies[cookie[0]]}`;
            const redisData = await redis.get(redisKey);

            if (!redisData) {
                return res.status(400).json({ success: false, message: "Code not found" });
            }

            const { codeHash, phone, attemptsRespondCode, attemptsRequestCode } = JSON.parse(redisData);

            const isCodeValid = await bcrypt.compare(req.body.code ?? '', codeHash);
            if (!isCodeValid) {
                await redis.set(redisKey, JSON.stringify({
                    codeHash,
                    phone,
                    attemptsRequestCode,
                    attemptsRespondCode: attemptsRespondCode - 1,
                }), 'EX', 300);
                return res.status(400).json({ success: false, message: "Неврный код" });
            }

            await redis.del(redisKey);
            await redis.del(`verify:${phone}`);


            let user = await UserService.findUser(phone);
            if (!user) {
                user = await UserService.createUser(phone);
            }


            console.log("everything is ok", isCodeValid, user);




            let {access_token, refresh_token} = PassportService.generateTokens(String(user.id), "user");

            res.status(200).cookie(cookie[1], refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            }).json({ 
                success: true,
                access_token,
                user: user
            });
            
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
            const existingCode: string | null = await UserService.getRedis(phone);

            if (existingCode) {
                res.status(200).json({ success: true });
                return;
            }

            // const smsCode = String(Math.floor(1000 + Math.random() * 9000));
            const smsCode = "8888"
            const codeHash = await bcrypt.hash(smsCode, 10);
            const verificationId = uuidv4();

            await redis.set(redisKey, JSON.stringify({
                verificationId,
            }), 'EX', 300);



            await redis.set(`verify:${verificationId}`, JSON.stringify({
                codeHash,
                phone,
                attemptsRequestCode: 5,
                attemptsRespondCode: 5,
            }), 'EX', 300);

            console.log(`Код для ${phone}: ${smsCode}`);

            res.status(200).cookie(cookie[0], verificationId, {
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

//npx sequelize-cli model:generate --name UserRefreshTokens --attributes id:string,refreshToken:string,userId:string