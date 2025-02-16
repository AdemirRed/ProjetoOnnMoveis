import e from 'express';
import Product from '../models/Products';
import { v4 } from 'uuid';
import * as Yup from 'yup';

class ProductController {
  // Método para criar um novo produto
  async store(req, res) {
    // Validação dos dados de entrada
    const schema = Yup.object({
      nome: Yup.string().required(),
      descricao: Yup.string().required(),
      preco: Yup.number().required(),
      estoque: Yup.number().required(),
      categoria: Yup.string().required(),
    });

    try {
      await schema.validateSync(req.body, { abortEarly: false });
    } catch (error) {
      return res.status(400).json({ error: error.errors });
    }

    const { nome, descricao, preco, estoque, categoria } = req.body;
    const { filename: path } = req.file;

    // Criação do produto no banco de dados
    const product = await Product.create({
      id: v4(),
      nome,
      descricao,
      preco,
      estoque,
      categoria,
      path,
    });

    // Retorno do produto criado
    return res.status(201).json({
      nome: product.nome,
      descricao: product.descricao,
      preco: product.preco,
      estoque: product.estoque,
      categoria: product.categoria,
    });
  }

  // Método para listar todos os produtos
  async index(req, res) {
    const products = await Product.findAll();

    
    return res.json(products);
  }
}

export default new ProductController();
