import dotenv from "dotenv";

import { Codes } from "../../models";

dotenv.config({
    path: 'server/.env'
})


// https://chatgpt.com/share/6797a7a2-ebb4-8009-9670-f0a10565dfbc

class UserService {
    async findCodes(phone: string) {
        return await Codes.findAll({
            where: {
                phone
            },
            // attributes: ["code"]
        });
    }
    async createCode(phone: string, code: string) {
        return await Codes.create({
            code,
            phone,
        });
    }
}


export default new UserService();