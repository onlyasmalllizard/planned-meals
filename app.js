const express = require('express');
const app = express();

// Middleware imports
const logger = require('morgan');
const path = require('path');

// Router imports
const recipesRouter = require('./routes/recipes');

app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/recipes', recipesRouter);

module.exports = app;
