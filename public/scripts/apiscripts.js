async function getRecipes() {
  const response = await fetch('http://localhost:3000/api/recipes');
  const data = await response.json();
  return data.payload;
}

async function addRecipeToDB(recipe) {
  console.log(recipe);
  const response = await fetch('http://localhost:3000/api/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipe),
  });
  console.log(response);
}
