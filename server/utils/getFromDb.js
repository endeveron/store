import { HttpError } from './error.js';
import { logger } from './logger.js';

const handleResData = (resData, itemModel, notFoundMsg) => {
  if (!resData) {
    return {
      data: null,
      error: new HttpError(
        notFoundMsg || `${itemModel.modelName} not found.`,
        404
      ),
    };
  }
  return {
    data: resData,
    error: null,
  };
};

const handleError = (err, itemModel) => {
  logger.r(`getItem 500 ${itemModel.modelName}`, err);
  return {
    data: null,
    error: new HttpError('Server error. Please try again later.', 500),
  };
};

const getItem = async (itemModel, query, notFoundMsg) => {
  try {
    const resData = await itemModel.findOne(query);
    return handleResData(resData, itemModel, notFoundMsg);
  } catch (err) {
    return handleError(err, itemModel);
  }
};

const getItemById = async (itemModel, id, notFoundMsg) => {
  try {
    const resData = await itemModel.findById(id);
    return handleResData(resData, itemModel, notFoundMsg);
  } catch (err) {
    return handleError(err, itemModel);
  }
};

export { getItem, getItemById };
