import express from 'express';
const router = express.Router();
import userController from '../controllers/user-controller';

router.get("/test", userController.test);

export default router;