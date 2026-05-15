import express from 'express';
import userRouter from './user-router';
import categoriesAdminRouter from './categories.admin.router';
import productsAdminRouter from './products.admin.router';

const router = express.Router();

router.use('/user', userRouter);
router.use('/admin', categoriesAdminRouter);
router.use('/admin', productsAdminRouter);
export default router;

