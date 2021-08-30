const pool = require('../../index');

async function createTable() {
  const response = await pool.query(`CREATE TABLE IF NOT EXISTS recipes (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    source TEXT NOT NULL,
    postedby INTEGER NOT NULL
  );`);

  if (response) {
    console.log('Recipes table created');
  }
}

createTable();
