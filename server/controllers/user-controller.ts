import express from 'express';
declare module 'express' {
    interface RequestUser {
        body: {phone: string}
    }
}

class UserController {
    async login (req: express.RequestUser, res: express.Response) {
        console.log(req.body, "ljl");
        return res.status(200).json({kjhl: "hi"});
    }
}
export default new UserController();