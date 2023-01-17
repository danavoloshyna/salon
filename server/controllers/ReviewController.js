import {Review, User} from '../models/models.js';

class ReviewsController {
  async getReviews(req, res, next) {
    try {
      const reviews = await Review.findAll({
        include: [
          {
            model: User,
            attributes: [
              'firstName', 'lastName'
            ],
          },

        ],
      });

      res.status(201).json(reviews);

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось зареєструватись'});
    }
  }

  async createReview(req, res, next) {
    try {
      const {id} = req.user;
      const {workerId, reviewsText} = req.body;

      await Review.create({
        userId: id,
        workerId,
        text: reviewsText,
      });

      res.status(201).json({message: 'Дякуємо вам за заллишений відгук!'});

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось записатись'});
    }
  }
}

export default new ReviewsController();
