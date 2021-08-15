const { query } = require('../db/index');

async function getAllRecipes() {
  const response = await query('SELECT * FROM recipes');
  return response.rows;
}

async function addRecipeToDb(recipe) {
  const response = await query(
    'INSERT INTO recipes (name, source) VALUES ($1, $2);',
    [recipe.name, recipe.source]
  );
  if (response) {
    console.log(`${recipe.name} added to database.`);
  }
}

module.exports = {
  getAllRecipes,
  addRecipeToDb,
};
