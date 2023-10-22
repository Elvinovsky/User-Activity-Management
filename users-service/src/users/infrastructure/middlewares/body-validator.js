import { body } from 'express-validator';

const checkFirstName = body('firstName')
  .trim()
  .bail()
  .isLength({ min: 1 })
  .withMessage('Имя обязательно для заполнения')
  .custom((firstName) => {
    if (typeof firstName !== 'string') {
      throw new Error('Имя должно быть строкой');
    }
    return true; // Указывает, что проверка пройдена
  });

const checkLastName = body('lastName')
  .trim()
  .bail()
  .isLength({ min: 1 })
  .withMessage('Фамилия обязательна для заполнения')
  .custom((lastName) => {
    if (typeof lastName !== 'string') {
      throw new Error('Фамилия должна быть строкой');
    }
    return true; // Указывает, что проверка пройдена
  });

const checkAge = body('age')
  .trim()
  .isInt({ min: 1 })
  .withMessage('Возраст должен быть положительным целым числом');

export default [checkAge, checkLastName, checkFirstName];
