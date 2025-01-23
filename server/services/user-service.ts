import dotenv from "dotenv";

import { Codes } from "../../models";

dotenv.config({
    path: 'server/.env'
})


class UserService {
    async findCode(code: string) {
        return await Codes.findOne({
            where: {
                code
            },
            attributes: ["code"]
        });
    }
}

export default new UserService();