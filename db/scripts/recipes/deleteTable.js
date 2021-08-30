const pool = require('../../index');

async function deleteTable() {
  const response = await pool.query('DROP TABLE IF EXISTS recipes;');

  if (response) {
    console.log('Recipe table deleted');
  }
}

deleteTable();
