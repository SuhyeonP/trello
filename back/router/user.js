import express from 'express';
import passport from 'passport';

import isValidateUserSignupData from '../validation/userSignup.js';
import { isLoggedIn, isNotLoggedIn } from './middlewares.js';

import user from '../service/user.js';

const router = express.Router();

// sign up
router.post('/signup', async (req, res, next) => {
  if (!isValidateUserSignupData(req.body)) {
    res.status(400).send({ message: 'invalid data' });
  }

  const { userId } = req.body;
  const { models } = req.db;
  const registerdUser = await user.findUser(models, userId);

  if (!registerdUser) {
    const result = await user.createUser(req.db, req.body);
    res.status(200).send(result);
    return;
  }

  res.status(400).send({ message: 'duplicated user' });
});

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const userInfoExceptPw = await user.reloadUser(req.db.models, req.user);
      res.status(200).json(userInfoExceptPw);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post(
  '/login',
  isNotLoggedIn,
  passport.authenticate('local'),
  async (req, res, next) => {
    const userInfo = await user.LoginUser(req.db.models, req.body);
    return res.status(200).json(userInfo);
  },
);

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

export default router;
