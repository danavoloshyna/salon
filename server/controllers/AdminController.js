import bcrypt from 'bcrypt';
import {User} from '../models/models.js';

class AdminController {
  async getAllWorkers(req, res, next) {
    try {
      const workers = await User.findAll({
        where: {role: 'WORKER'},
      });
      res.status(201).json(workers);

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось зареєструвати працівника'});
    }
  }

  async getOneWorker(req, res, next) {
    try {
      const {id} = req.params

      const worker = await User.findOne({
        raw:true,
        where: {id},
        attributes:['lastName', 'firstName', 'phone', 'email']
      });
      res.status(201).json(worker);

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось знайти користувача працівника'});
    }
  }

  async createWorker(req, res, next) {
    try {
      const {login, password, firstName, lastName, email, phone} = req.body;

      if (!login || !password) {
        res.status(403).json({message: 'Некоректний email або пароль'});
      }

      const candidate = await User.findOne({where: {login}});
      if (candidate) {
        res.status(403).json({message: 'Такий працівник вже існує'});
      }

      const hashPassword = await bcrypt.hash(password, 7);

      await User.create({
        login,
        password: hashPassword,
        firstName,
        lastName,
        email,
        phone,
        role: 'WORKER',
      });

      res.status(201).json({message: 'Рєстрація працівника успішна!'});

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось зареєструвати працівника'});
    }
  }

  async updateWorker(req, res, next) {
    try {
      const {id, phone, email, lastName, firstName } = req.body
      console.log(lastName);
      const user = await User.findOne({
        where: {id: id}
      });

      user.phone = phone
      user.email = email
      user.lastName = lastName
      user.firstName = firstName
      await user.save();

      res.status(201).json({message: 'Дані оновлено'});

    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось зареєструвати працівника'});
    }
  }

  async deleteOneDelete(req, res, next) {
    try {
      const workerId = req.params.id;
      console.log(req.params.id);
      const worker = await User.findOne({where: {id: workerId}});
      await worker.destroy();
      res.status(201).json({message: 'Працівника видалено!'});
    } catch (e) {
      console.log(e);
      res.status(500).json({message: 'Не вдалось видалити працівника'});
    }
  }
}

export default new AdminController();
