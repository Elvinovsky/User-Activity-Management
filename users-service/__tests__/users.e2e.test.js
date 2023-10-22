import request from 'supertest';
import { app } from '../src/app';
import sequelize from '../src/runDB.js';

const invalidBodyCreate = {
  age: 'invalid',
  lastName: '   ',
  firstName: 12,
};

const invalidBodyUpdate = {
  age: -1,
  lastName: '____',
  firstName: '____',
};

const validBodyCreate = {
  age: 18,
  lastName: 'Эльвин',
  firstName: 'Агакеримов',
};

const validBodyUpdate = {
  age: 20,
  lastName: 'Агакеримов',
  firstName: 'Эльвин',
};
let createUser;
describe('Users E2E Tests', () => {
  beforeAll(async () => {
    await sequelize.truncate();
    await request(app).delete('/users/history/all-data');
  });

  it('GET, return empty array users', async () => {
    await request(app).get('/users').expect(200, []);
  });

  it('GET all history, should return pagination model with empty array of items', async () => {
    await request(app).get('/users/history').expect(200, {
      pagesCount: 0,
      page: 1,
      pageSize: 10,
      totalCount: 0,
      items: [],
    });
  });

  it('GET history activity by userId, should return 404 ', async () => {
    await request(app).get('/users/history/1').expect(404);
  });

  it('POST, should return a 400 status code and a errorsMessages', async () => {
    const response = await request(app).post('/users').send(invalidBodyCreate);

    expect(response.body).toEqual({
      errorsMessages: [
        {
          message: 'Возраст должен быть положительным целым числом',
          field: 'age',
        },
        {
          message: 'Фамилия обязательна для заполнения',
          field: 'lastName',
        },
        {
          message: 'Имя должно быть строкой',
          field: 'firstName',
        },
      ],
    });
  });

  it('PUT, should return a 404 status code ', async () => {
    await request(app).put('/users/1').send(invalidBodyUpdate).expect(404);
  });

  it('POST should return 201 status code  and userViewData ', async () => {
    const response = await request(app).post('/users').send(validBodyCreate);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({
      id: expect.stringMatching(
        /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
      ),
      fullName: 'Агакеримов Эльвин',
      age: 18,
      createdAt: expect.stringMatching(
        /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
      ),
    });
    createUser = response.body;
  });

  it('PUT, should return a 400 status code and a errorsMessages', async () => {
    const updateUser = await request(app)
      .put(`/users/${createUser.id}`)
      .send(invalidBodyUpdate);

    expect(updateUser.body).toEqual({
      errorsMessages: [
        {
          message: 'Возраст должен быть положительным целым числом',
          field: 'age',
        },
        {
          message: 'Фамилия должна быть строкой',
          field: 'lastName',
        },
        {
          message: 'Имя должно быть строкой',
          field: 'firstName',
        },
      ],
    });
  });

  it('PUT should return 204 status code', async () => {
    await request(app)
      .put(`/users/${createUser.id}`)
      .send(validBodyUpdate)
      .expect(204);
  });

  it('GET, return users array', async () => {
    const users = await request(app).get('/users');

    expect(users.body).toEqual([
      {
        id: createUser.id,
        fullName: 'Эльвин Агакеримов',
        age: 20,
        createdAt: expect.stringMatching(
          /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
        ),
      },
    ]);
  });

  it('GET, should return pagination model with one user element of array in items', async () => {
    const historiesActivate = await request(app).get('/users/history');

    expect(historiesActivate.body).toEqual({
      pagesCount: 1,
      page: 1,
      pageSize: 10,
      totalCount: 2,
      items: [
        {
          userId: createUser.id,
          actualData: {
            fullName: 'Эльвин Агакеримов',
            age: 20,
            changedAt: expect.stringMatching(
              /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
            ),
          },

          oldData: [
            {
              fullName: 'Агакеримов Эльвин',
              age: 18,
              changedAt: expect.stringMatching(
                /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/,
              ),
            },
          ],
        },
      ],
    });
  });
});
