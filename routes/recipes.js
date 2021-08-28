const { Router } = require('express');
const router = new Router();
const recipesModel = require('../models/recipes');

router.get('/', async (_, res) => {
  try {
    const data = await recipesModel.getAllRecipes();
    res.json({
      success: true,
      message: 'All recipes',
      payload: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'GET request failed',
    });
  }
});

router.post('/', async (req, res) => {
  const { body } = req;
  try {
    const data = await recipesModel.createRecipe(body);
    res.status(201).json({
      success: true,
      message: 'Recipe added to database',
      payload: data,
    });
  } catch (error) {
    if (error.message.includes('violates')) {
      res.status(400).json({
        success: false,
        message: 'POST request failed',
        payload: `${error.name}: ${error.message}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'POST request failed',
      });
    }
  }
});

module.exports = router;
