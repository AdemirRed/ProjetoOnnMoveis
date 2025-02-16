import { Sequelize } from "sequelize";
import configDatabase from "../config/database";

import User from "../app/models/User";
import Product from "../app/models/Products";

const models = [User, Product];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(configDatabase);

        models.forEach(model => {
            if (model.init) {
                model.init(this.connection);
            }
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
}

export default new Database();