import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class usuarios extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        senha_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN
      },
      {
        sequelize
      }
    );

    this.addHook('beforeSave', async usuarios => {
      if (usuarios.senha) {
        usuarios.senha_hash = await bcrypt.hash(usuarios.senha, 8);
      }
    });
    return this;
  }

  async checkPassword(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }
}

export default usuarios;