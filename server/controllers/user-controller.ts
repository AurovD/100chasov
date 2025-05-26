import express from 'express';
import {User} from "../../types/user";
import UserService from "../services/user-service";
import PassportService from "../services/passport-service";
import {JwtPayload} from "jsonwebtoken";


declare module 'express' {
    interface Request {
        body: Pick<User, 'phone'>
    }
}

class UserController {
    async activate (req: express.Request, res: express.Response): Promise<any> {
        return res.status(200).json({ success: true });
    }
    async code (req: express.Request, res: express.Response): Promise<any> {
        const phone: string = req.body.phone;
        if (!phone) {
            return res.status(400).json();
        }


        try {
            let oldUserRecord = await UserService.findCodes(phone);
            if(oldUserRecord){
                let token: string | JwtPayload | null =
                  PassportService.validateTemporaryToken(
                    oldUserRecord.temporary_token,
                  );
                if(token){
                    return res.status(200).json({ success: true });
                }

                await UserService.deleteCode(phone);
            }
            const smsCode:string = `${Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000}`;
            let temp_token: string = PassportService.generateTemporaryToken(phone);
            // await UserService.createCode(phone, smsCode, temp_token);

            res
              .status(200)
              .cookie("token", temp_token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 1800000,
              }).json({ success: true });
        } catch (err) {
            return res.status(500).json();
        }
    }
}
export default new UserController();