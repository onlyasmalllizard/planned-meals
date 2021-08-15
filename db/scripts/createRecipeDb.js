const { query } = require('../index');

async function createRecipeDb() {
  const queryString =
    'CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name TEXT NOT NULL, source TEXT NOT NULL, house INTEGER, postedby INTEGER);';
  const response = await query(queryString);

  if (response) {
    console.log('Recipes table created');
  }
}

createRecipeDb();
