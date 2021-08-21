const { query } = require('../db/index');

async function getAllRecipes() {
  const response = await query('SELECT * FROM recipes');
  return response.rows;
}

async function addRecipeToDb(recipe) {
  const response = await query(
    'INSERT INTO recipes (name, source) VALUES ($1, $2) RETURNING *;',
    [recipe.name, recipe.source]
  );
  return response.rows[0];
}

module.exports = {
  getAllRecipes,
  addRecipeToDb,
};
