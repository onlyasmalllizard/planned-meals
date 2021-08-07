const recipeName = document.querySelector('#recipe-name');
const recipeLocation = document.querySelector('#recipe-location');
const recipeLocOptions = document.querySelectorAll(
  'input[name=recipe-loc-type]'
);
const submitButton = document.querySelector('#submit-recipe');
const recipeList = document.querySelector('#recipe-list');

submitButton.addEventListener('click', addRecipeToList);

function addRecipeToList(event) {
  event.preventDefault();
  if (!isFormComplete()) {
    alert('Please complete all fields in the form!');
    return;
  }
  createListItem(recipeName.value, recipeLocation.value);
  resetForm();
}

function isFormComplete() {
  if (!recipeName.value || !recipeLocation.value) {
    return false;
  }
  return true;
}

function isLink() {
  let result = false;
  recipeLocOptions.forEach((option) => {
    if (option.value === 'Website' && option.checked) {
      result = true;
    }
  });
  return result;
}

function resetForm() {
  recipeName.value = '';
  recipeLocation.value = '';
  recipeLocOptions[0].checked = true;
}

function createListItem(recipe, location) {
  const listItem = document.createElement('li');
  if (isLink()) {
    location = createLink(location, recipe);
    listItem.appendChild(location);
  } else {
    listItem.innerText += `${recipe} — ${location}`;
  }
  recipeList.appendChild(listItem);
}

function createLink(url, recipe) {
  const link = document.createElement('a');
  let address = url;
  if (url.startsWith('http') === false) {
    address = `https://${url}`;
  }
  link.href = address;
  link.innerText = recipe;
  return link;
}
