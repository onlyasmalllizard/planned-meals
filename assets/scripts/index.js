const recipeList = document.querySelector('#recipe-list');
const recipeName = document.querySelector('#recipe-name');
const recipeLocation = document.querySelector('#recipe-location');
const recipeLocationLabel = document.querySelector('#recipe-location-label');
const recipeLocOptions = document.querySelectorAll(
  'input[name=recipe-loc-type]'
);
recipeLocOptions.forEach((option) => {
  option.addEventListener('click', updateRecipeLocationInput);
});

const submitButton = document.querySelector('#submit-recipe');
submitButton.addEventListener('click', addRecipeToList);

function updateRecipeLocationInput(event) {
  if (event.target.value === 'Book') {
    recipeLocation.type = 'text';
    recipeLocation.placeholder = 'Cookbook';
    recipeLocationLabel.innerText =
      'Enter the title of the book the recipe can be found in:';
  } else if (event.target.value === 'Website') {
    recipeLocation.type = 'url';
    recipeLocation.placeholder = 'https://example.com';
    recipeLocationLabel.innerText =
      'Enter the URL where the recipe can be found:';
  }
}

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
  if (!recipeName.checkValidity() || !recipeLocation.checkValidity()) {
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
  link.href = url;
  link.innerText = recipe;
  return link;
}
