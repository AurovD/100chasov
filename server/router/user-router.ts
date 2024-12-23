import express from 'express';
import userController from '../controllers/user-controller';

const router = express.Router();

router.post("/code", userController.code);
router.post("/activate", userController.activate);

export default router;
