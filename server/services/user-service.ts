import dotenv from "dotenv";

import { Verifications } from "../../models";

dotenv.config({
    path: 'server/.env'
})



class UserService {
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