const { Router } = require('express');
const router = new Router();
const { getAllRecipes, addRecipeToDb } = require('../models/recipes');

router.get('/', async (_, res) => {
  try {
    const data = await getAllRecipes();
    res.json({
      success: true,
      message: 'All recipes',
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'GET request failed',
      payload: `${err.name}: ${err.message}`,
    });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await addRecipeToDb(body);
    res.json({
      success: true,
      message: 'Recipe added to database',
      payload: data,
    });
  } catch (err) {
    res.json({
      success: false,
      message: 'POST request failed',
      payload: `${err.name}: ${err.message}`,
    });
  }
});

module.exports = router;
