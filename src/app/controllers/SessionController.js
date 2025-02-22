require('dotenv').config();
import * as Yup from 'yup';
import User from '../models/User';
import jwt from 'jsonwebtoken';

import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required()
    });

    const isValid = await schema.isValid(req.body);

    const userOrPasswordIncorrect = () => {
      res.status(401).json({ error: 'Email ou senha incorretos!' });
    };

    if (!isValid) {
      return userOrPasswordIncorrect();
    }

    const { email, senha } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return userOrPasswordIncorrect();
    }

    const isSamePassword = await user.checkPassword(senha);

    if (!isSamePassword) {
      return userOrPasswordIncorrect();
    }

    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      })
    });
  }
}

export default new SessionController();