const pool = require('../../index');

async function deleteTable() {
  const response = await pool.query(`DROP TABLE IF EXISTS users;`);

  if (response) {
    console.log('Users table deleted');
  }
}

deleteTable();
