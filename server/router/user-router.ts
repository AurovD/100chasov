import express from 'express';
import userController from '../controllers/user-controller';
import { passport } from "../core/passport";

const router = express.Router();

router.post("/request_code", userController.requestCode);
router.post("/verify_code", userController.verifyCode);
router.post("/delete_user", userController.delete);
router.get("/resend_code", userController.resendCode);
router.post("/login", passport.authenticate('access-jwt', { session: false }), userController.login);


export default router;
