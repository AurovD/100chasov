import Redis from 'ioredis';
import dotenv from "dotenv";

dotenv.config({
    path: 'server/.env'
});

const redis = new Redis({
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: 6379,
    // connectTimeout: 3000,
    // family: 4,
});

// Проверка подключения
redis.on('connect', () => {
    console.log('✅ Redis подключен');
});

redis.on('error', (err) => {
    console.error('❌ Ошибка подключения к Redis:', err);
});

// (async () => {
//     try {
//         console.log("redis is running");
//         await redis.set('test', 'hello', 'EX', 40);
//         const value = await redis.get('test');
//         console.log('📦 Got value:', value);
//     } catch (err) {
//         console.error('🔥 Error:', err);
//     } finally {
//         redis.disconnect();
//     }
// })();

export default redis;
