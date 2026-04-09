const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: "Bem-vindo à API da Padaria Santo Martins!"});
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor voando na porta ${PORT}`);
});