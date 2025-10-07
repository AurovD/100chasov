import express from 'express';
import { passport } from "../core/passport";
import adminController from "../controllers/admin-controller";

const router = express.Router();
router.post("/add_category", passport.authenticate('access-jwt', { session: false }), adminController.addCategory);


export default router;
