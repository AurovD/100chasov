import express from 'express';
import {User} from "../../types/user";
import UserService from "../services/user-service";
import PassportService from "../services/passport-service";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import redis from '../../config/redis';
import {JwtPayload} from "jsonwebtoken";
import * as process from "node:process";


declare module "express-serve-static-core" {
    interface Request {
        user: Pick<User, "id" | "role" | "login">;
    }
}


const cookie: string[] = ['_33b54ef1-4db5-431c-88ad-8a7ff7956c5f', "_979481d1-b1de-4242-9da0-b5cbd247c54a"];

class UserController {
    async resendCode (req: express.Request, res: express.Response): Promise<any> {
        const redisKey = req.cookies[cookie[0]];
        const redisData: string | null = await UserService.getRedis(redisKey);

        if (!redisKey || !redisData) {
            return res.status(400).json({ success: false, message: "Пользователь не найден" });
        }

        const { codeHash, phone, attemptsRespondCode, attemptsRequestCode } = JSON.parse(redisData);

        const newSmsCode = "7777"
        const newCodeHash = await bcrypt.hash(newSmsCode, 10);

        let updatedAttemptsRequestCode = attemptsRequestCode + 1;

        console.log(updatedAttemptsRequestCode);

        if(updatedAttemptsRequestCode >= 5){
            return res.status(400).json({ success: false, attempts: updatedAttemptsRequestCode, message: "Вы исчерпали количество попыток" });
        }


        await UserService.setRedis(phone, {
            verificationId: redisKey,
        }, 300);

        await UserService.setRedis(redisKey, {
            codeHash: newCodeHash,
            phone,
            attemptsRequestCode: updatedAttemptsRequestCode,
            attemptsRespondCode: attemptsRequestCode,
        }, 300);

        console.log(`Код для ${phone}: ${newSmsCode}`);

        return res.status(200).json({ success: true, attempts: updatedAttemptsRequestCode });
    }
    async delete (req: express.Request, res: express.Response): Promise<any> {
        await UserService.deleteUser(req.body.phone);
        return res.status(200).json({ success: true });
    }
    async me (req: express.Request, res: express.Response): Promise<any> {
        const token = req.cookies[cookie[1]];
        if (!token) {
            return res.status(401).json({ success: false, message: "No refresh token" });
        }

        const payload: string | JwtPayload = await PassportService.validateRefreshToken(token);
        if (!payload || typeof payload === "string") {
            return res.status(401).json({ success: false, message: "Invalid refresh token" });
        }

        const user = await UserService.findUser(undefined, (payload as JwtPayload & { id: string }).id);

        const { access_token, refresh_token } = PassportService.generateTokens(String(user.id), "user");


        res.cookie(cookie[1], refresh_token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        return res.status(200).json({
            success: true,
            access_token,
            user,
        });
    }
    async login(req: express.Request, res: express.Response): Promise<void> {
        try {
            const { login } = req.body;
            const userId = req.user?.id;
            console.log(req.cookies);

            if (!userId || !login) {
                res.status(400).json({ success: false, message: "Некорректные данные" });
                return;
            }

            const updatedCount = await UserService.changeLogin(userId, login);

            if (updatedCount === 0) {
                res.status(404).json({ success: false, message: "Пользователь не найден или логин не изменён" });
                return;
            }

            res.status(200).json({ success: true });
        } catch (err) {
            console.log("Ошибка при смене логина:", err);
            res.status(500).json({ success: false, message: "Серверная ошибкаhgjg" });
        }
    }
    async verifyCode (req: express.Request, res: express.Response): Promise<any> {

        try {
            const redisKey = req.cookies[cookie[0]];
            const redisData: string | null = await UserService.getRedis(redisKey);


            if (!redisData) {
                return res.status(400).json({ success: false, message: "Код не найден" });
            }

            const { codeHash, phone, attemptsRespondCode, attemptsRequestCode } = JSON.parse(redisData);

            const isCodeValid = await bcrypt.compare(req.body.code ?? '', codeHash);
            if (!isCodeValid) {

                if(attemptsRespondCode === 0) {
                    // await redis.del(`verify:${redisKey}`);
                    // await redis.del(`verify:${phone}`);

                    const isBanned = await UserService.getRedis(`ban:${phone}`);

                    if (isBanned) {
                        res.status(400).json({ success: false, message: "Превышано количество попыток" });
                        return;
                    }

                    await UserService.setRedis(`ban:${phone}`, {
                        phone
                    }, 300);

                    return res.status(400).json({ success: false, message: "Вы сделали максимальное количество попыток, попробуйте войти позднее" });
                }

                await UserService.setRedis(redisKey, {
                    codeHash,
                    phone,
                    attemptsRequestCode,
                    attemptsRespondCode: attemptsRespondCode - 1,
                }, 300);

                return res.status(400).json({ success: false, message: "Неверный код" });
            }

            await redis.del(`verify:${redisKey}`);
            await redis.del(`verify:${phone}`);


            let user = await UserService.findUser(phone);
            if (!user) {
                user = await UserService.createUser(phone);
            }




            let {access_token, refresh_token} = PassportService.generateTokens(String(user.id), "user");

            res.status(200).cookie(cookie[1], refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
            }).json({ 
                success: true,
                access_token,
                user
            });
            
        } catch (err) {
            console.error("Ошибка при запросе кода:", err);
            res.status(500).json({ success: false, message: "Серверная ошибка" });
        }
    }

    async requestCode(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
        const phone: string = req.body.phone;
        console.log(phone);

        if (!phone) {
            res.status(400).json({ success: false, message: "Phone is required" });
            return;
        }

        const isBanned = await UserService.getRedis(`ban:${phone}`);

        console.log(isBanned);

        if (isBanned) {
            res.status(400).json({ success: false, message: "Превышано количество попыток" });
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


            await UserService.setRedis(phone, {
                verificationId,
            }, 300);

            await UserService.setRedis(verificationId, {
                codeHash,
                phone,
                attemptsRequestCode: 0,
                attemptsRespondCode: 5,
            }, 300);

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