const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastrar cliente
router.post('/', async (req, res) => {
  const { name, contact } = req.body;
  try {
    await db.query('INSERT INTO clients (name, contact) VALUES ($1, $2)', [name, contact]);
    res.status(201).send('Cliente cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obter clientes
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM clients');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
