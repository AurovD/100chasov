import express from 'express';
import { passport } from "../core/passport";
import productsAdminController from "../controllers/products.admin.controller";

const router = express.Router();
router.delete("/products/create", passport.authenticate('access-jwt', { session: false }), productsAdminController.create);

export default router;