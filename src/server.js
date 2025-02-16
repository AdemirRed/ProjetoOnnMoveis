//const app = require('./app') → modelo mais antigo

const port = 3001

import app from './app'

app.listen(port, () => console.log(`Servidor rodando na porta: ${port}`))