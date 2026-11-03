import express from 'express';
import { passport } from "../core/passport";
import categoryAdminController from "../controllers/categories.admin.controller";

const router = express.Router();
router.post("/categories/create", passport.authenticate('access-jwt', { session: false }), categoryAdminController.create);
router.get("/categories", passport.authenticate('access-jwt', { session: false }), categoryAdminController.get);
router.delete("/categories/delete", passport.authenticate('access-jwt', { session: false }), categoryAdminController.delete);
router.patch("/categories/patch", passport.authenticate('access-jwt', { session: false }), categoryAdminController.patch);


export default router;
