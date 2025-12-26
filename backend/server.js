const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./routes/clientes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// ROTAS
app.use('/clientes', clientesRoutes);

app.get('/', (req, res) => {
    res.send('API Cadastro de Clientes rodando!');
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
