const express = require('express');
const cors = require('cors');
const db = require('./db'); 
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produtos', async (req, res) => {
    const { categoria } = req.query;

    try {

        let sql = `
            SELECT P.* FROM Produto P
            JOIN Produto_Categoria pc ON P.idProduto = pc.idProduto
            JOIN Categoria c ON pc.idCategoria = c.idCategoria
            ${categoria && categoria !== 'Todos os produtos' ? 'WHERE c.nome_categoria = ?' : ''}
        `;
        let params = [];

        if (categoria && categoria !== 'Todos os produtos') {
            sql += ' GROUP BY P.idProduto';
            params = [categoria];
        }
        
        const [rows] = await db.query(sql, params);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar produtos", detalhes: err.message });
    }
});

app.patch('/produtos/:id/favorito', async (req, res) => {
    const { id } = req.params;
    const { favorito } = req.body;
    try {
        await db.query('UPDATE Produto SET favorito = ? WHERE idProduto = ?', [favorito, id]);
        res.status(200).send("Atualizado");
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get('/', (req, res) => {
    res.json({ mensagem: "API da Padaria Santo Martins conectada!" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
