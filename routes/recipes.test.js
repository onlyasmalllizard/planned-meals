const request = require('supertest');
const app = require('../app');
const recipesModel = require('../models/recipes');

/**
 * Contents
 *
 * 1. GET router tests
 * 2. POST router tests
 * 3. PUT router tests
 * 4. PATCH router tests
 * 5. DELETE router test
 *
 **/

/* 1. GET router tests */

describe('GET requests', () => {
  test('When successful, GET /recipes by user returns the correct response', async () => {
    // Arrange
    const user = 1;
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: `All recipes posted by user ${user}`,
      payload: expect.any(Array),
    };

    jest.spyOn(recipesModel, 'getRecipesByUser');
    recipesModel.getRecipesByUser.mockImplementation(async () => {
      console.log('Mock function here!');
      return [
        {
          id: 1,
          name: 'Singapore Noodles',
          source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
          postedby: user,
        },
      ];
    });

    console.log(recipesModel.getRecipesByUser());

    // Act
    const actual = await request(app).get(`/recipes?user=${user}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getRecipesByUser.mockRestore();
  });

  test('When unsuccessful, GET /recipes by user returns the correct response', async () => {
    // Arrange
    const user = 1;
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'GET request failed',
    };

    jest.spyOn(recipesModel, 'getRecipesByUser');
    recipesModel.getRecipesByUser.mockImplementation(async () => {
      throw new Error();
    });

    // Act
    const actual = await request(app).get(`/recipes?user=${user}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getRecipesByUser.mockRestore();
  });

  test('When successful, GET all /recipes returns the correct response', async () => {
    // Arrange
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: 'All recipes',
      payload: expect.any(Array),
    };

    jest.spyOn(recipesModel, 'getAllRecipes');
    recipesModel.getAllRecipes.mockImplementation(async () => {
      return [
        {
          id: 1,
          name: 'Singapore Noodles',
          source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
          postedby: 1,
        },
      ];
    });

    // Act
    const actual = await request(app).get('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getAllRecipes.mockRestore();
  });

  test('When unsuccessful, GET all /recipes returns the correct response', async () => {
    // Arrange
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'GET request failed',
    };

    jest.spyOn(recipesModel, 'getAllRecipes');
    recipesModel.getAllRecipes.mockImplementation(async () => {
      throw new Error();
    });

    // Act
    const actual = await request(app).get('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getAllRecipes.mockRestore();
  });

  test('When successful, GET /recipes by id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: `Recipe with ID ${id} found`,
      payload: expect.any(Object),
    };

    jest.spyOn(recipesModel, 'getRecipeById');
    recipesModel.getRecipeById.mockImplementation(async () => {
      return {
        id: id,
        name: 'Singapore Noodles',
        source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
        postedby: 1,
      };
    });

    // Act
    const actual = await request(app).get(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getRecipeById.mockRestore();
  });

  test('When unsuccessful, GET /recipes by id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'GET request failed',
    };

    jest.spyOn(recipesModel, 'getRecipeById');
    recipesModel.getRecipeById.mockImplementation(async () => {
      throw new Error();
    });

    // Act
    const actual = await request(app).get(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getRecipeById.mockRestore();
  });
});

/* 2. POST router tests */

describe('POST requests', () => {
  test('When successful, POST /recipes returns the correct response', async () => {
    // Arrange
    const expectedStatusCode = 201;
    const expectedBody = {
      success: true,
      message: 'Recipe added to database',
      payload: expect.any(Object),
    };

    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      return {};
    });

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });

  test('When unsuccessful due to user error, POST /recipes returns the correct response', async () => {
    // Arrange
    const expectedStatusCode = 400;
    const expectedBody = {
      success: false,
      message: 'POST request failed',
      payload: expect.any(String),
    };

    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      throw new Error('null value violates not-null constraint');
    });

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });

  test('When unsuccessful due to server error, POST /recipes returns the correct response', async () => {
    // Arrange
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'POST request failed',
    };

    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      throw new Error('Syntax error');
    });

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });
});

/* 3. PUT router tests */

describe('PUT requests', () => {
  test('When successful, PUT /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: `Recipe with ID ${id} successfully updated`,
      payload: expect.any(Object),
    };

    jest.spyOn(recipesModel, 'updateRecipe');
    recipesModel.updateRecipe.mockImplementation(async () => {
      return {
        id: id,
        name: 'Singapore Noodles',
        source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
        postedby: 1,
      };
    });

    // Act
    const actual = await request(app).put(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipe.mockRestore();
  });

  test('When unsuccessful due to user error, PUT /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 400;
    const expectedBody = {
      success: false,
      message: 'PUT request failed',
      payload: expect.any(String),
    };

    jest.spyOn(recipesModel, 'updateRecipe');
    recipesModel.updateRecipe.mockImplementation(async () => {
      throw new Error('null value violates not-null constraint');
    });

    // Act
    const actual = await request(app).put(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipe.mockRestore();
  });

  test('When unsuccessful due to server error, PUT /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'PUT request failed',
    };

    jest.spyOn(recipesModel, 'updateRecipe');
    recipesModel.updateRecipe.mockImplementation(async () => {
      throw new Error('Syntax error');
    });

    // Act
    const actual = await request(app).put(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipe.mockRestore();
  });
});

/* 4. PATCH router tests */

describe('PATCH requests', () => {
  test('When successful, PATCH /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: `Recipe with ID ${id} successfully updated`,
      payload: expect.any(Object),
    };

    jest.spyOn(recipesModel, 'updateRecipeAttribute');
    recipesModel.updateRecipeAttribute.mockImplementation(async () => {
      return {
        id: id,
        name: 'Singapore Noodles',
        source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
        postedby: 1,
      };
    });

    // Act
    const actual = await request(app).patch(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipeAttribute.mockRestore();
  });

  test('When unsuccessful due to user error, PATCH /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 400;
    const expectedBody = {
      success: false,
      message: 'PATCH request failed',
      payload: expect.any(String),
    };

    jest.spyOn(recipesModel, 'updateRecipeAttribute');
    recipesModel.updateRecipeAttribute.mockImplementation(async () => {
      throw new Error('null value violates not-null constraint');
    });

    // Act
    const actual = await request(app).patch(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipeAttribute.mockRestore();
  });

  test('When unsuccessful due to server error, PATCH /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'PATCH request failed',
    };

    jest.spyOn(recipesModel, 'updateRecipeAttribute');
    recipesModel.updateRecipeAttribute.mockImplementation(async () => {
      throw new Error('Syntax error');
    });

    // Act
    const actual = await request(app).patch(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.updateRecipeAttribute.mockRestore();
  });
});

/* 5. DELETE router tests */

describe('DELETE requests', () => {
  test('When successful, DELETE /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: `Recipe with ID ${id} successfully deleted`,
      payload: expect.any(Object),
    };

    jest.spyOn(recipesModel, 'deleteRecipe');
    recipesModel.deleteRecipe.mockImplementation(async () => {
      return {
        id: id,
        name: 'Singapore Noodles',
        source: 'https://thewoksoflife.com/vegetarian-singapore-noodles/',
        postedby: 1,
      };
    });

    // Act
    const actual = await request(app).delete(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.deleteRecipe.mockRestore();
  });

  test('When unsuccessful, DELETE /recipes/:id returns the correct response', async () => {
    // Arrange
    const id = 1;
    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'DELETE request failed',
    };

    jest.spyOn(recipesModel, 'deleteRecipe');
    recipesModel.deleteRecipe.mockImplementation(async () => {
      throw new Error();
    });

    // Act
    const actual = await request(app).delete(`/recipes/${id}`);

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.deleteRecipe.mockRestore();
  });
});
