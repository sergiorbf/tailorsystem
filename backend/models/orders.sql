CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  piece TEXT NOT NULL,
  value NUMERIC(10, 2) NOT NULL,
  request_date DATE NOT NULL,
  delivery_date DATE NOT NULL
);