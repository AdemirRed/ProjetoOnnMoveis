import Sequelize, { Model } from 'sequelize';

class produtos extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        nome: Sequelize.STRING,
        descricao: Sequelize.STRING,
        preco: Sequelize.FLOAT,
        estoque: Sequelize.INTEGER,
        categoria: Sequelize.STRING,
        path: Sequelize.STRING,
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `http://localhost:3001/product-file/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default produtos;
