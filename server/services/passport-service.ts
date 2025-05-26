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
    generateTemporaryToken(phone: string): string {
        const payload = {
            phone,
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
    validateTemporaryToken(token: string) {
        try {
            const userData = jwt.verify(token, process.env.JWT_TEMPORARY_SECRET || '');
            return userData;
        } catch (e) {
            return null;
        }
    }
    // async findToken(id) {
    // }
    // async deleteToken(token) {
    // }
    // async deleteTemporaryToken(token) {
    // }
}
export default new PassportService();


// 1. Ввод телефона → сервер возвращает временный токен
// 2. Ввод кода + временный токен → сервер возвращает access/refresh токены и данные пользователя
// 3. Сохраняем accessToken (в localStorage), refreshToken — в cookie (устанавливает сервер)
// 4. Используем accessToken для запросов
// 5. При 401 — пробуем обновить accessToken через refreshToken
// 6. При logout — удаляем токены