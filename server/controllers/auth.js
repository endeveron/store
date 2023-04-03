import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { getItem, HttpError, isRequestValid, logger } from '../utils/index.js';
import { UserModel } from '../models/index.js';

const genetrateJWToken = (userId, next) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_KEY, {
      expiresIn: '48h',
    });
    return token;
  } catch (err) {
    logger.r('genetrateJWToken', err);
    return next(new HttpError(`Token generating error. ${err._message}`, 500));
  }
};

export const login = async (req, res, next) => {
  if (!isRequestValid(req, next)) return;
  const { email, password } = req.body;

  // check if the user is created
  const userData = await getItem(
    UserModel,
    { 'account.email': email },
    "There's no account for this email."
  );
  if (userData?.error) return next(userData.error);
  const user = userData.data;

  // check the password
  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.account.password);
  } catch (err) {
    logger.r('login: password unhashing', err);
    return next(new HttpError('Password unhashing error.', 500));
  }
  if (!isValidPassword) {
    return next(new HttpError('Incorrect password', 401));
  }

  try {
    await user.save();

    // generate JWT
    const token = genetrateJWToken(user._id, next);

    res.send({
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    logger.r('login', err);
    return next(new HttpError(error.message, 500));
  }
};

export const signup = async (req, res, next) => {
  if (!isRequestValid(req, next)) return;
  const { name, username, email, password } = req.body;

  // check if the user is created
  try {
    const emailInUse = await UserModel.exists({ 'account.email': email });
    if (emailInUse) {
      return next(new HttpError('Email already in use.', 409));
    }
  } catch (err) {
    logger.r('signup: check is user exists', err);
    return next(new HttpError('User check error.', 500));
  }

  // hash password
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    logger.r('signup: password hashing', err);
    return next(new HttpError(`Password hashing error. ${err._message}`, 500));
  }

  // create a new user
  const user = new UserModel({
    account: {
      name: name || '',
      username,
      email,
      password: hashedPassword,
    },
  });

  try {
    await user.save();

    // generate JWT
    const token = genetrateJWToken(user._id, next);

    res.status(201).send({
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    logger.r('signup', err);
    return next(new HttpError(`Could not create user. ${err.message}`, 500));
  }
};
