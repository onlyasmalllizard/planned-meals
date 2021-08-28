const pool = require('../db/index');

async function getAllRecipes() {
  const response = await pool.query('SELECT * FROM recipes');
  return response.rows;
}

async function createRecipe(recipe) {
  const response = await pool.query(
    'INSERT INTO recipes (name, source) VALUES ($1, $2) RETURNING *;',
    [recipe.name, recipe.source]
  );
  return response.rows[0];
}

module.exports = {
  getAllRecipes,
  createRecipe,
};
