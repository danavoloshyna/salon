import Router from 'express';
import handleValidationErrors
  from '../middlewares/validationErrorMiddleware.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import ReviewsController from '../controllers/ReviewController.js'

const reviewRouter = new Router();

reviewRouter.post(
    '/',
    handleValidationErrors,
    authMiddleware,
    ReviewsController.createReview,
);

reviewRouter.get(
    '/',
    handleValidationErrors,
    ReviewsController.getReviews,
);

export default reviewRouter;
