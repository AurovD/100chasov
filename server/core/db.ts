import {Sequelize} from 'sequelize';

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Environment variable ${key} is not set`);
    }
    return value;
};

const sequelize = new Sequelize(getEnvVar('DB_NAME'),
    getEnvVar('DB_USER'),
    getEnvVar('DB_PASSWORD'),
    {
        host: getEnvVar('DB_HOST'),
        dialect: 'postgres',
    });

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
export { sequelize }