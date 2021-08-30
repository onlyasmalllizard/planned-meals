const pool = require('../../index');
const format = require('pg-format');
const recipes = require('../../../dummy-data/recipes-data');

async function populateTable(data) {
  for (let recipe of data) {
    const sqlQuery = format(
      'INSERT INTO recipes (name, source, postedby) VALUES (%L, %L, %L) RETURNING *;',
      recipe.name,
      recipe.source,
      recipe.postedby
    );
    const response = await pool.query(sqlQuery);
    console.log(response.rows[0]);
  }
  console.log('Recipes table populated');
}

populateTable(recipes);
