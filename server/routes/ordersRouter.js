import Router from 'express';
import handleValidationErrors
  from '../middlewares/validationErrorMiddleware.js';
import ordersController from '../controllers/OrdersController.js';
import authMiddleware from '../middlewares/authMiddleware.js';


const ordersRouter = new Router();

ordersRouter.post(
    '/',
    handleValidationErrors,
    authMiddleware,
    ordersController.createOrder,
);

ordersRouter.get(
    '/',
    handleValidationErrors,
    authMiddleware,
    ordersController.getOrders,
);

export default ordersRouter;
