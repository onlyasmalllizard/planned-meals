const express = require('express');
const app = express();
const port = 3000;

// Middleware imports
const logger = require('morgan');

// Router imports
const recipesRouter = require('./routes/recipes');

app.use(express.json());
app.use(logger('dev'));

app.use('/api/recipes', recipesRouter);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
