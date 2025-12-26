const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE
router.post('/', (req, res) => {
    const { nome, email, telefone, endereco } = req.body;

    db.query(
        'CALL inserirCliente(?,?,?,?)',
        [nome, email, telefone, endereco],
        (err) => {
            if (err) {
                console.error('Erro ao inserir cliente:', err);
                // Erro de banco (ex: violação de chave única, campo nulo, etc.)
                return res.status(400).json({ erro: err.message });
            }
            // Sucesso na criação → 201 Created
            res.status(201).json({ mensagem: 'Cliente cadastrado com sucesso!' });
        }
    );
});

// CONSULTA
router.get('/', (req, res) => {
    const nome = req.query.nome || "";

    db.query(
        'CALL consultarClientes(?)',
        [nome],
        (err, results) => {
            if (err) {
                console.error('Erro na consulta:', err);
                return res.status(500).json({ erro: 'Erro interno do servidor' });
            }
            res.status(200).json(results[0]); // 200 é opcional (padrão), mas explícito é bom
        }
    );
});

// UPDATE
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone, endereco } = req.body;

    db.query(
        'CALL atualizarCliente(?,?,?,?,?)',
        [id, nome, email, telefone, endereco],
        (err) => {
            if (err) {
                console.error('Erro ao atualizar cliente:', err);
                return res.status(400).json({ erro: err.message });
            }
            res.status(200).json({ mensagem: 'Cliente atualizado com sucesso!' });
        }
    );
});

// DELETE
router.delete('/:id', (req, res) => {
    db.query(
        'CALL deletarCliente(?)',
        [req.params.id],
        (err) => {
            if (err) {
                console.error('Erro ao excluir cliente:', err);
                return res.status(400).json({ erro: err.message });
            }
            res.status(200).json({ mensagem: 'Cliente excluído com sucesso!' });
        }
    );
});

module.exports = router;