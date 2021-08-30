const pool = require('../../index');

async function deleteTable() {
  const response = await pool.query('DROP TABLE IF EXISTS households');

  if (response) {
    console.log('Households table deleted');
  }
}

deleteTable();
