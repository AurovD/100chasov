import express from 'express';
import userController from '../controllers/user-controller';
import { passport } from "../core/passport";

const router = express.Router();

router.post("/request_code", userController.requestCode);
router.post("/activate", passport.authenticate('temp-jwt', { session: false }), userController.activate);


export default router;
