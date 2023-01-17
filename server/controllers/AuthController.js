import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {User} from '../models/models.js';

const generateJwtToken = (id, role) => jwt.sign({
  id: id,
  role: role,
}, process.env.SECRET_KEY, {expiresIn: '12h'});


class AuthController {
  async registration(req, res, next) {
    try {
      const {login, password, firstName, lastName, email, phone } = req.body;

      if (!login || !password) {
        res.status(403).json({message: 'Некоректний email або пароль'});
      }

      const candidate = await User.findOne({where: {login}});
      if (candidate) {
        res.status(403).json({message: 'Такий користувач вже існує'})
      }

      const hashPassword = await bcrypt.hash(password, 7);

      await User.create({
        login,
        password: hashPassword,
        firstName,
        lastName,
        email,
        phone
      });

      res.status(201).json({message: 'Рєстрація успішна!'});

    } catch (e) {
      console.log(e)
      res.status(500).json({message: 'Не вдалось зареєструватись'});
    }
  }

  async authenticate(req, res, next) {
    try {
      const {login, password} = req.body;
      const user = await User.findOne({where: {login}});
      if (!user) {
        return res.status(400).json({message: 'Логін або пароль неправильний'});
      }

      const comparePassword = await bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return res.status(400).json({message: 'Логін або пароль неправильний'});
      }

      const token = generateJwtToken(user.id, user.role);
      return res.json({token});

    } catch (e) {
      res.status(500).json({message: 'Не вдалось авторизуватись'});
    }
  }


}

export default new AuthController();
