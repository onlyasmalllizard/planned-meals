const request = require('supertest');
const app = require('../app');
const recipesModel = require('../models/recipes');

describe('GET requests', () => {
  test('When successful, GET /recipes returns an object with the correct structure and status code', async () => {
    // Arrange
    jest.spyOn(recipesModel, 'getAllRecipes');
    recipesModel.getAllRecipes.mockImplementation(async () => {
      return [{ message: 'hello' }];
    });

    const expectedStatusCode = 200;
    const expectedBody = {
      success: true,
      message: expect.any(String),
      payload: expect.any(Array),
    };

    // Act
    const actual = await request(app).get('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getAllRecipes.mockRestore();
  });

  test('When unsuccessful, GET /recipes returns a response with the expected structure and status code', async () => {
    // Arrange
    jest.spyOn(recipesModel, 'getAllRecipes');
    recipesModel.getAllRecipes.mockImplementation(async () => {
      throw new Error();
    });

    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'GET request failed',
    };

    // Act
    const actual = await request(app).get('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.getAllRecipes.mockRestore();
  });
});

describe('POST requests', () => {
  test('When successful, POST /recipes returns an object with the correct structure and status code', async () => {
    // Arrange
    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      return {};
    });

    const expectedStatusCode = 201;
    const expectedBody = {
      success: true,
      message: expect.any(String),
      payload: expect.any(Object),
    };

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });

  test('When unsuccessful due to server error, POST /recipes returns an object with the correct structure and status code', async () => {
    // Arrange
    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      throw new Error('null value violates not-null constraint');
    });

    const expectedStatusCode = 400;
    const expectedBody = {
      success: false,
      message: 'POST request failed',
      payload: expect.any(String),
    };

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });

  test('When successful, POST /recipes returns an object with the correct structure and status code', async () => {
    // Arrange
    jest.spyOn(recipesModel, 'createRecipe');
    recipesModel.createRecipe.mockImplementation(async () => {
      throw new Error('A different error message');
    });

    const expectedStatusCode = 500;
    const expectedBody = {
      success: false,
      message: 'POST request failed',
    };

    // Act
    const actual = await request(app).post('/recipes');

    // Assert
    expect(actual.statusCode).toBe(expectedStatusCode);
    expect(actual.body).toStrictEqual(expectedBody);

    // Cleanup
    recipesModel.createRecipe.mockRestore();
  });
});
