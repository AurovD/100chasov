import express from 'express';
import { passport } from "../core/passport";
import categoryController from "../controllers/categories-controller";

const router = express.Router();
router.post("/category/add_category", passport.authenticate('access-jwt', { session: false }), categoryController.addCategory);
router.get("/category", passport.authenticate('access-jwt', { session: false }), categoryController.getCategory);


export default router;
