import { body } from 'express-validator';

const checkFirstName = body('firstName')
  .trim()
  .bail()
  .isLength({ min: 1 })
  .withMessage('Имя обязательно для заполнения')
  .bail()
  .matches(/(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])/, 'i')
  .withMessage('Имя должно быть строкой');

const checkLastName = body('lastName')
  .trim()
  .bail()
  .isLength({ min: 1 })
  .withMessage('Фамилия обязательна для заполнения')
  .bail()
  .matches(/(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])/, 'i')
  .withMessage('Фамилия должна быть строкой');

const checkAge = body('age')
  .trim()
  .bail()
  .isLength({ min: 1 })
  .withMessage('Возраст обязателен для заполнения')
  .isInt({ min: 1 })
  .withMessage('Возраст должен быть положительным целым числом');

export default [checkAge, checkLastName, checkFirstName];
