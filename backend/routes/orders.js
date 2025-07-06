const express = require('express');
const router = express.Router();
const db = require('../db');

// Cadastrar pedido
router.post('/', async (req, res) => {
  const { client_name, piece, value, request_date, delivery_date } = req.body;
  try {
    await db.query(
      `INSERT INTO orders 
      (
        client_name, 
        piece, 
        value, 
        request_date, 
        delivery_date
      ) VALUES 
      (
        $1,
        $2,
        $3,
        $4,
        $5
      )`,
      [
        client_name,
        piece,
        value,
        request_date,
        delivery_date
      ]
    );
    res.status(201).send('Pedido cadastrado com sucesso');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Obter pedidos
router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM orders');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
