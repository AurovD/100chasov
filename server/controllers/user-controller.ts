import express from 'express';
import {User} from "../../types/user";
import UserService from "../services/user-service";
import PassportService from "../services/passport-service";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';


declare module 'express' {
    interface Request {
        body: Pick<User, 'phone'>
    }
}

class UserController {
    async activate (req: express.Request, res: express.Response): Promise<any> {
        const isValid = await PassportService.validateTemporaryToken(req.cookies.token);
        console.log(isValid, "test");
        // PassportService.validateTemporaryToken(
        //     req.cookies,
        // ); //передать токен или телефон ? захэшировать???
        return res.status(200).json({ success: true });
    }

    async requestCode(req: express.Request, res: express.Response): Promise<express.Response>{
        const phone: string = req.body.phone;

        if (!phone) {
            return res.status(400).json({ success: false, message: "Phone is required" });
        }

        try {
            const existingSession = await UserService.findVerificationSession(phone);

            if (existingSession) {
                const isExpired = UserService.isExpired(existingSession.expiresAt);

                if (isExpired) {
                    await UserService.deleteVerificationSessions(phone);
                } else {
                    // Сессия активна, не создаём новую
                    return res.status(200).json({ success: true });
                }
            }

            const smsCode = String(Math.floor(1000 + Math.random() * 9000)); // 4-значный код
            const codeHash = await bcrypt.hash(smsCode, 10);

            const verificationId = uuidv4();

            await UserService.createVerificationSession({
                verificationId,
                phone,
                codeHash
            });

            // Отправить SMS — временно логируем
            console.log(`Код для ${phone}: ${smsCode} (id: ${verificationId})`);

            return res.status(200).json({ success: true });
        } catch (err) {
            console.error("Ошибка при запросе кода:", err);
            return res.status(500).json({ success: false, message: "Internal server error" });
        }
    }

}
export default new UserController();