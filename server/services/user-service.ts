import dotenv from "dotenv";

import { Users } from "../../models";

import redis from '../../config/redis';

dotenv.config({
    path: 'server/.env'
})



class UserService {
    async createUser(phone: string, ) {
        return await Users.create({
            phone
        });
    }
    async changeLogin(id: string, login: string) {
        let [updatedCount] = await Users.update(
            { login },
            {
                where: {
                    id,
                },
            },
        );
        return updatedCount;
    }
    async deleteUser(phone: string, ) {
        const whereQuery = { phone };
        console.log(whereQuery)
        await Users.destroy({
                where: whereQuery
        });
    }

    async findUser(phone: string, ) {
        const whereQuery = { phone };
        console.log(whereQuery)
        return await Users.findOne({
                where: whereQuery
        });
    }

    async setRedis(id: string, data: { [key: string]: any }, time: number) {
            return redis.set(`verify:${id}`, JSON.stringify(data), 'EX', time);
    }
    async getRedis(id: string) {
        return redis.get(`verify:${id}`);
    }
}


export default new UserService();