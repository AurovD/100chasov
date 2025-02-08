import jwt from 'jsonwebtoken';
import dotenv  from 'dotenv';
dotenv.config({
    path: 'routes/.env'
});

class PassportService {
    // generateTokens(id, role) {
    //     const payload = {
    //         id,
    //         role,
    //         date: Date.now()
    //     }
    //     const accessToken = jwt.sign(payload,
    //         process.env.JWT_ACCESS_SECRET || '',
    //         {
    //             expiresIn: process.env.JWT_MIN_AGE,
    //             algorithm: 'HS256',
    //         }
    //     );
    //
    //     const refreshToken = jwt.sign(payload,
    //         process.env.JWT_REFRESH_SECRET || '',
    //         {
    //             expiresIn: process.env.JWT_MAX_AGE,
    //             algorithm: 'HS256',
    //         }
    //     );
    //
    //     return {
    //         accessToken,
    //         refreshToken
    //     }
    //
    // }
    generateTemporaryToken(code: string): string {
        const payload = {
            code,
        }
        const temporaryToken: string = jwt.sign(payload,
            process.env.JWT_TEMPORARY_SECRET || '',
            {
                expiresIn: process.env.JWT_MIN_AGE,
                algorithm: 'HS256',
            }
        );

        return temporaryToken;

    }
    // async saveToken(id, refreshToken) {
    // }
    // validateRefreshToken(token) {
    // }
    // validateTemporaryToken(token) {
    // }
    // async findToken(id) {
    // }
    // async deleteToken(token) {
    // }
    // async deleteTemporaryToken(token) {
    // }
}
export default new PassportService();