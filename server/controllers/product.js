import { CategoryModel, ProductModel } from '../models/index.js';
import { HttpError, isRequestValid, logger } from '../utils/index.js';

export const createCategory = async (req, res, next) => {
  if (!isRequestValid(req, next)) return;
  const { icon, title } = req.body;

  // create category
  const category = new CategoryModel({
    icon,
    title,
  });

  try {
    await category.save();
    res.send({
      data: category,
    });
  } catch (err) {
    logger.r('createCategory', err);
    return next(new HttpError(`Error. ${err.message}`, 500));
  }
};

export const createProduct = async (req, res, next) => {
  if (!isRequestValid(req, next)) return;
  const {
    title,
    categories,
    colors,
    description,
    likes,
    price,
    rate,
    specification,
  } = req.body;

  // create product
  const product = new ProductModel({
    title,
    categories,
    colors,
    description,
    likes,
    price,
    rate,
    specification,
  });

  try {
    await product.save();

    res.send({
      data: product,
    });
  } catch (err) {
    logger.r('createProduct', err);
    return next(new HttpError(`Error. ${err.message}`, 500));
  }
};

export const deleteProduct = async (req, res, next) => {
  const productId = req.params.id;

  if (!productId) {
    return next(new HttpError('Invalid Product ID', 422));
  }

  try {
    await ProductModel.findByIdAndDelete(productId);

    res.send({
      data: {
        _id: productId,
      },
      status: 1,
    });
  } catch (err) {
    logger.r('deleteProduct', err);
    return next(new HttpError(`Error. ${err.message}`, 500));
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({});

    res.send({
      data: categories,
    });
  } catch (err) {
    logger.r('getategories', err);
    return next(new HttpError(err.message, 500));
  }
};

export const getCategoryProducts = async (req, res, next) => {
  const categoryId = req.params.id;

  try {
    const products = await ProductModel.find({
      categories: categoryId,
    }).populate({
      path: 'categories',
      model: 'Category',
    });

    res.send({
      data: products,
    });
  } catch (err) {
    logger.r('getCategoryProducts', err);
    return next(new HttpError(err.message, 500));
  }
};

export const getProduct = async (req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    res.send({
      data: product,
    });
  } catch (err) {
    logger.r('getProduct', err);
    return next(new HttpError(err.message, 500));
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({});

    res.send({
      data: products,
    });
  } catch (err) {
    logger.r('getProducts', err);
    return next(new HttpError(err.message, 500));
  }
};

export const searchProduct = async (req, res, next) => {
  const query = req.params.query;

  try {
    // const categories = await CategoryModel.find({
    //   $text: { $search: query },
    // });
    const products = await ProductModel.find({ $text: { $search: query } });

    res.send({
      data: {
        // categories,
        products,
      },
    });
  } catch (err) {
    logger.r('getProduct', err);
    return next(new HttpError(err.message, 500));
  }
};
