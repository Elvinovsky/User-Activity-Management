import { Router } from 'express';
import service from '../infrastructure/compositions-root.js';
import axios from 'axios';

import { paramValidator } from '../infrastructure/middlewares/param-validator.js';
import bodyValidator from '../infrastructure/middlewares/body-validator.js';
import { checkForErrors } from '../infrastructure/exceptions/exceptions-filter.js';

export const usersRouter = Router();

// 1. Создание пользователя и истории
usersRouter.post('/', bodyValidator, checkForErrors, async (req, res) => {
  try {
    const resultCreate = await service.create(
      req.body.firstName,
      req.body.age,
      req.body.lastName,
    );

    const apiUrl = 'http://localhost:3000/history/create';
    const requestData = {
      id: resultCreate.id,
      fullName: resultCreate.fullName,
      age: resultCreate.age,
    };

    const response = await axios.post(apiUrl, requestData);

    if (response.status === 200) {
      res.status(201).send(resultCreate);
    } else {
      console.log('Error creating history:', response.data);
      res.status(500).send({
        message:
          'User created, but there was an issue with the history service.',
      });
    }
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send({ message: 'Error creating user' });
  }
});

// 2. Получение всех пользователей
usersRouter.get('/', async (req, res) => {
  try {
    const getAllUsers = await service.getUsers();
    res.send(getAllUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send({ message: 'Error fetching users' });
  }
});

// 3. Получение всех истории действий с пользователями.
usersRouter.get('/history', async (req, res) => {
  try {
    const queryParams = {
      pageNumber: req.query?.pageNumber,
      pageSize: req.query?.pageSize,
    };
    const getHistory = await axios.get('http://localhost:3000/history', {
      params: queryParams,
    });

    res.send(getHistory.data);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).send({ message: 'Error fetching history' });
  }
});

// 4. Получение истории действий с определенным пользователем.
usersRouter.get('/history/:id', paramValidator, async (req, res) => {
  try {
    const userId = req.params.id;
    const queryParams = {
      pageNumber: req.query?.pageNumber,
      pageSize: req.query?.pageSize,
    };

    const userExist = await service.findUser(userId);
    if (!userExist) {
      res.sendStatus(404);
    }

    const getHistory = await axios.get(
      `http://localhost:3000/history/${userId}`,
      {
        params: queryParams,
      },
    );
    console.log( getHistory.data)

    getHistory.data.items[0].actualData.fullName = userExist.fullName;
    getHistory.data.items[0].actualData.age = userExist.age;
    getHistory.data.items[0].actualData.changedAt = userExist.createdAt;

    res.send(getHistory.data);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).send({ message: 'Error fetching history' });
  }
});

// 4. Обновление пользователя и запись истории
usersRouter.put(
  '/:id',
  paramValidator,
  bodyValidator,
  checkForErrors,
  async (req, res) => {
    try {
      const inputData = {
        id: req.params.id,
        firstName: req.body.firstName,
        age: req.body.age,
        lastName: req.body.lastName,
      };

      const resultUpdate = await service.update(inputData);
      if (!resultUpdate) {
        res.sendStatus(404);
        return;
      }

      const apiUrl = 'http://localhost:3000/history/create';
      const requestData = {
        id: inputData.id,
        fullName: `${inputData.firstName} ${inputData.lastName}`,
        age: +inputData.age,
      };

      const response = await axios.post(apiUrl, requestData);
      console.log(response);

      res.sendStatus(204);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).send({ message: 'Error updating user' });
    }
  },
);
