import { CategoryModel, OrderModel, ProductModel } from '../models/index.js';
import { HttpError, isRequestValid, logger } from '../utils/index.js';

export const createOrder = async (req, res, next) => {
  if (!isRequestValid(req, next)) return;
  const { cartPrice, products, shipping, totalPrice, user } = req.body;

  // Assign a number
  const orderNumber = Math.round(new Date().getTime() / 60000);

  // create order
  const order = new OrderModel({
    cartPrice,
    number: orderNumber,
    products,
    shipping,
    totalPrice,
    user,
    date: new Date().toISOString(),
  });

  try {
    await order.save();
    res.send({
      data: order,
    });
  } catch (err) {
    logger.r('createOrder', err);
    return next(new HttpError(`Error. ${err.message}`, 500));
  }
};

export const getOrders = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const orders = await OrderModel.find({ 'user._id': userId });

    res.send({
      data: orders,
    });
  } catch (err) {
    logger.r('getOrders', err);
    return next(new HttpError(err.message, 500));
  }
};

export const getOrder = async (req, res, next) => {
  const orderId = req.params.id;

  try {
    const order = await OrderModel.findById(orderId);

    res.send({
      data: order,
    });
  } catch (err) {
    logger.r('getOrder', err);
    return next(new HttpError(err.message, 500));
  }
};
