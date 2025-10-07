import express from 'express';


class AdminController {
    async addCategory (req: express.Request, res: express.Response): Promise<any> {
        return res.status(200).json({ success: true });
    }
}
export default new AdminController();

//npx sequelize-cli model:generate --name UserRefreshTokens --attributes id:string,refreshToken:string,userId:string