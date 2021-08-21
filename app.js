const express = require('express');
const app = express();
const port = 3000;

// Middleware imports
const logger = require('morgan');
const path = require('path');

// Router imports
const recipesRouter = require('./routes/recipes');

app.use(express.json());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/recipes', recipesRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
