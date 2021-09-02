const pool = require('../../index');
const households = require('../../../sample-data/households-data');

async function populateTable(data) {
  for (let household of data) {
    const sqlQuery = `INSERT INTO households
        (name, users, admin)
        VALUES ($1, $2, $3)
        RETURNING *;`;

    const response = await pool.query(sqlQuery, [
      household.name,
      household.users,
      household.admin,
    ]);
    console.log(response.rows[0]);
  }
  console.log('Households table populated');
}

populateTable(households);
