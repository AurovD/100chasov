import dotenv from "dotenv";

import { Codes } from "../../models";

dotenv.config({
    path: 'server/.env'
})



class UserService {
    async findCodes(phone: string) {
        const whereQuery = { phone };
        return await Codes.findOne({
            where: {
                whereQuery
            },
            raw: true
        });
    }
    async createCode(phone: string, code: string, token: string) {
        return await Codes.create({
            code,
            phone,
            temporary_token: token
        });
    }
    async deleteCode(phone: string) {
        return await Codes.destroy({
            where: {
                phone
            }
        })
    }
}


export default new UserService();