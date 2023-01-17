import Router from 'express';
import authRouter from './authRouter.js';
import adminRouter from './adminsRouter.js';
import ordersRouter from './ordersRouter.js';
import reviewRouter from './reviewRouter.js';

const router = new Router();

router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/orders', ordersRouter)
router.use('/review', reviewRouter)

export default router;
