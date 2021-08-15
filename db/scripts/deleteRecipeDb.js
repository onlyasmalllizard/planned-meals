const { query } = require('../index');

async function deleteRecipeDb() {
  const queryString = 'DROP TABLE IF EXISTS recipes;';
  const response = await query(queryString);

  if (response) {
    console.log('Recipe table deleted');
  }
}

deleteRecipeDb();
