const pool = require('../../index');
const users = require('../../../dummy-data/users-data');

async function populateTable(data) {
  for (let user of data) {
    const sqlQuery = `INSERT INTO users
        (name, recipes, household)
        VALUES ($1, $2, $3)
        RETURNING *;`;

    const response = await pool.query(sqlQuery, [
      user.name,
      user.recipes,
      user.household,
    ]);

    console.log(response.rows[0]);
  }

  console.log('Users table populated');
}

populateTable(users);
