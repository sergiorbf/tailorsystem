const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/clients', require('./routes/clients'));
app.use('/orders', require('./routes/orders'));

async function runMigrations() {
  try {
    const clientSQL = fs.readFileSync(path.join(__dirname, 'models/clients.sql'), 'utf-8');
    const orderSQL = fs.readFileSync(path.join(__dirname, 'models/orders.sql'), 'utf-8');

    await db.query(clientSQL);
    await db.query(orderSQL);

    console.log('Tabelas criadas/verificadas com sucesso!');
  } catch (err) {
    console.error('Erro ao rodar migrations:', err.message);
  }
}

app.listen(3001, async () => {
  await runMigrations();
  console.log('Servidor rodando em http://localhost:3001');
});
