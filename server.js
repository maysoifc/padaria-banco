const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produtos', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Produto');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar produtos", detalhes: err.message });
    }
});

app.get('/', (req, res) => {
    res.json({ mensagem: "API da Padaria Santo Martins conectada!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
