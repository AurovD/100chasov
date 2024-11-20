import express from 'express';
const router = express.Router();
import userController from '../controllers/user-controller';

router.post("/login", userController.login);

export default router;