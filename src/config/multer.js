import multer from 'multer';
import { v4 } from 'uuid';
import { extname, resolve } from 'node:path';

export default {
  storage: multer.diskStorage({
    // Define o destino dos arquivos de upload
    destination: resolve(__dirname, '..', '..', 'uploads'),
    // Define o nome do arquivo de upload
    filename: (req, file, callback) => 
        callback(null, v4() + extname(file.originalname)),
  })
};