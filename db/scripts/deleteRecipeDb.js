const pool = require('../index');

async function deleteRecipeDb() {
  const queryString = 'DROP TABLE IF EXISTS recipes;';
  const response = await pool.query(queryString);

  if (response) {
    console.log('Recipe table deleted');
  }
}

deleteRecipeDb();
