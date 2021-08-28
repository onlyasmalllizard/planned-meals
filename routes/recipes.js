const { Router } = require('express');
const router = new Router();
const recipesModel = require('../models/recipes');

// GET recipe by id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next();
  }

  try {
    const data = await recipesModel.getRecipeById(id);
    res.json({
      success: true,
      message: `Recipe with ID ${id} found`,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'GET request failed',
    });
  }
});

// GET recipes by user
router.get('/', async (req, res, next) => {
  const { user } = req.query;
  if (!user) {
    return next();
  }

  try {
    const data = await recipesModel.getRecipesByUser(user);
    res.json({
      success: true,
      message: `All recipes posted by user ${user}`,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'GET request failed',
    });
  }
});

// GET all recipes
router.get('/', async (_, res) => {
  try {
    const data = await recipesModel.getAllRecipes();
    res.json({
      success: true,
      message: 'All recipes',
      payload: data,
    });
  } catch {
    res.status(500).json({
      success: false,
      message: 'GET request failed',
    });
  }
});

// POST route
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
    if (error.message.toLowerCase().includes('violates')) {
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

// PUT recipe
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const data = await recipesModel.updateRecipe(id, body);
    res.json({
      success: true,
      message: `Recipe with ID ${data.id} successfully updated`,
      payload: data,
    });
  } catch (error) {
    if (error.message.includes('violates')) {
      res.status(400).json({
        success: false,
        message: 'PUT request failed',
        payload: `${error.name}: ${error.message}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'PUT request failed',
      });
    }
  }
});

// PATCH recipe
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const data = await recipesModel.updateRecipeAttribute(id, body);
    res.json({
      success: true,
      message: `Recipe with ID ${data.id} successfully updated`,
      payload: data,
    });
  } catch (error) {
    if (error.message.includes('violates')) {
      res.status(400).json({
        success: false,
        message: 'PATCH request failed',
        payload: `${error.name}: ${error.message}`,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'PATCH request failed',
      });
    }
  }
});

// DELETE recipe
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await recipesModel.deleteRecipe(id);
    res.json({
      success: true,
      message: `Recipe with ID ${data.id} successfully deleted`,
      payload: data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'DELETE request failed',
    });
  }
});

module.exports = router;
