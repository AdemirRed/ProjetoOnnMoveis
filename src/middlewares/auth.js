require('dotenv').config();
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth';

function authMiddleware(req, res, next) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).json({ error: 'Token não fornecido!' });
  }

  const token = authToken.split(' ').at(1);

  try {
    const decoded = jwt.verify(token, authConfig.secret);
    
    req.userId = decoded.id;
    return next();

  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido!' });
  }
}

export default authMiddleware;