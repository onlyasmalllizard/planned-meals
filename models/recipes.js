const pool = require('../db/index');
const format = require('pg-format');

async function getAllRecipes() {
  const response = await pool.query('SELECT * FROM recipes');
  return response.rows;
}

async function getRecipeById(id) {
  const sqlQuery = format('SELECT * FROM recipes WHERE id = %L', id);
  const response = await pool.query(sqlQuery);
  return response.rows[0];
}

async function getRecipesByUser(user) {
  const sqlQuery = format('SELECT * FROM recipes WHERE postedby = %L', user);
  const response = await pool.query(sqlQuery);
  return response.rows;
}

async function createRecipe({ name, source }) {
  const sqlQuery = format(
    'INSERT INTO recipes (name, source) VALUES (%L, %L) RETURNING *;',
    name,
    source
  );
  const response = await pool.query(sqlQuery);
  return response.rows[0];
}

async function updateRecipe(id, { name, source }) {
  const sqlQuery = format(
    'UPDATE recipes SET name = %L, source = %L WHERE id = %L RETURNING *;',
    name,
    source,
    id
  );
  const response = await pool.query(sqlQuery);
  return response.rows[0];
}

async function updateRecipeAttribute(id, { attribute, value }) {
  const sqlQuery = format(
    'UPDATE recipes SET %I = %L WHERE id = %L RETURNING *;',
    attribute,
    value,
    id
  );
  const response = await pool.query(sqlQuery);
  return response.rows[0];
}

async function deleteRecipe(id) {
  const sqlQuery = format('DELETE FROM recipes WHERE id = %L RETURNING *;', id);
  const response = await pool.query(sqlQuery);
  return response.rows;
}

module.exports = {
  getAllRecipes,
  getRecipeById,
  getRecipesByUser,
  createRecipe,
  updateRecipe,
  updateRecipeAttribute,
  deleteRecipe,
};
