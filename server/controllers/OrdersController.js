import {Order, User} from '../models/models.js';

class OrdersController {
  async getOrders(req, res, next) {
    try {
      const {id} = req.user;
      const orders = await Order.findAll({
        where: {
          workerId: id,
        },
        include: [
          {
            model: User,
            attributes: [
              'firstName', 'lastName', 'phone', 'email',
            ],
          },

        ],
      });

      res.status(201).json(orders);

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось зареєструватись'});
    }
  }

  async createOrder(req, res, next) {
    try {
      const {id} = req.user;
      const {workerId, date} = req.body;

      await Order.create({
        userId: id,
        workerId,
        date,
      });

      res.status(201).json({message: 'Дякуємо вам за заллишений відгук!'});

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось записатись'});
    }
  }
}

export default new OrdersController();
