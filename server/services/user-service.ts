import dotenv from "dotenv";

import { Users } from "../../models";

dotenv.config({
    path: 'server/.env'
})



class UserService {
    async createUser(phone: string, ) {
        return await Users.create({
            phone
        });
    }
    async deleteUser(phone: string, ) {
        const whereQuery = { phone };
        console.log(whereQuery)
        await Users.destroy({
                where: whereQuery
        });
    }
    // async findVerificationSession(phone: string) {
    //     // const whereQuery = { phone };
    //     return await Verifications.findOne({
    //         where: {
    //             phone
    //         },
    //         raw: true
    //     });
    // }
    // async createVerificationSession({ verificationId, phone, codeHash}: {
    //     verificationId: string;
    //     phone: string;
    //     codeHash: string;
    // }) {
    //     await Verifications.create({
    //         id: verificationId,
    //         phone,
    //         codeHash,
    //         expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 минут });
    //     });
    // }
    // isExpired(expiresAt: Date ): boolean {
    //     return new Date() > new Date(expiresAt);
    // }
    //
    //
    // async deleteVerificationSessions(phone: string) {
    //     return await Verifications.destroy({
    //         where: {
    //             phone
    //         }
    //     })
    // }
}


export default new UserService();