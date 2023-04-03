import { validationResult } from 'express-validator';

import { HttpError, logger } from './index.js';

const createErrMessage = (errData) => {
  const errArr = [];
  errData.errors.forEach((err) => errArr.push(` ${err.msg} '${err.param}'`));
  const errStr = errArr?.length ? errArr.join('.') + '.' : '';

  return `Check your data.${errStr}`;
};

const handleErrorMessage = (message, next) => {
  logger.r('isRequestValid', message);
  // send error to errorController
  next(new HttpError(message, 400));
};

const isRequestValid = (req, next) => {
  const errData = validationResult(req);
  if (!errData.isEmpty()) {
    const errMessage = createErrMessage(errData);
    handleErrorMessage(errMessage, next);
    return false;
  }
  return true;
};

export { isRequestValid };
