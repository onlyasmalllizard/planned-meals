const pool = require('../../index');

async function createTable() {
  const response = await pool.query(`CREATE TABLE IF NOT EXISTS households (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    users INTEGER ARRAY NOT NULL,
    admin INTEGER NOT NULL
    );`);

  if (response) {
    console.log('Households table created');
  }
}

createTable();
