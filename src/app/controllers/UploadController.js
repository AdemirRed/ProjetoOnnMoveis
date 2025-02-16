import multer from 'multer';
import multerConfig from '../../config/multer';

const upload = multer(multerConfig).single('file');

class UploadController {
  async store(req, res) {
    return upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
      } else if (err) {
        return res.status(500).json({ error: 'Erro ao fazer upload do arquivo' });
      }

      return res.status(200).json({ message: 'Upload realizado com sucesso' });
    });
  }
}

export default new UploadController();
