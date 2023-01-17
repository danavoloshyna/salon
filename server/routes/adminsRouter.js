import Router from 'express';
import AdminController from '../controllers/AdminController.js';
import handleValidationErrors
  from '../middlewares/validationErrorMiddleware.js';

const adminRouter = new Router();

adminRouter.post(
    '/worker',
    handleValidationErrors,
    AdminController.createWorker,
);

adminRouter.patch(
    '/worker',
    handleValidationErrors,
    AdminController.updateWorker,
);

adminRouter.get(
    '/worker',
    handleValidationErrors,
    AdminController.getAllWorkers,
);

adminRouter.get(
    '/worker/:id',
    handleValidationErrors,
    AdminController.getOneWorker,
);

adminRouter.delete(
    '/worker/:id',
    handleValidationErrors,
    AdminController.deleteOneDelete,
);

export default adminRouter;
