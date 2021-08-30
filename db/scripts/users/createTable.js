const pool = require('../../index');

async function createTable() {
  const response = await pool.query(`CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        recipes INTEGER ARRAY,
        household INTEGER NOT NULL
    );`);

  if (response) {
    console.log('Users table created');
  }
}

createTable();
