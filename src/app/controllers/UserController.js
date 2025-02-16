import User from '../models/User';
import { v4 } from 'uuid';
import * as Yup from 'yup';

class UserController {
  async store(req, res) {
    // Definindo o esquema de validação para os dados do usuário
    const schema = Yup.object({
      nome: Yup.string().required(),
      email: Yup.string().email().required(),
      senha: Yup.string().min(6).required(),
      admin: Yup.boolean()
    });

    // Validando os dados recebidos na requisição
    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    // Verificar se a tabela "usuarios" existe
    try {
      await User.sync({ tableName: 'usuarios' });
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao verificar a tabela de usuários' });
    }

    // Método para criar um novo usuário
    const { nome, email, senha, admin } = req.body;

    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: 'Usuário já existe' });
    }

    const user = await User.create({
      id: v4(), // Gerando um UUID para o novo usuário
      nome,
      email,
      senha,
      admin,
    });

    // Retornando os dados do usuário criado
    return res.status(201).json({
      id: user.id,
      nome: user.nome,
      email: user.email,
      admin: user.admin
    });
  }

  
}

export default new UserController();
