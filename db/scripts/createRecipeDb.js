const pool = require('../index');

async function createRecipeDb() {
  const queryString =
    'CREATE TABLE IF NOT EXISTS recipes (id SERIAL PRIMARY KEY, name TEXT NOT NULL, source TEXT NOT NULL, postedby INTEGER);';
  const response = await pool.query(queryString);

  if (response) {
    console.log('Recipes table created');
  }
}

createRecipeDb();
