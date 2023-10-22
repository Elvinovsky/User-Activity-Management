import { validationResult } from 'express-validator';

export const checkForErrors = (req, res, next) => {
  const errorFormatter = ({ msg, path }) => {
    return {
      message: msg,
      field: path,
    };
  };

  const error = validationResult(req).formatWith(errorFormatter);
  if (!error.isEmpty()) {
    return res.status(400).send({ errorsMessages: error.array() });
  }
  return next();
};
