import { Router } from 'express';
import {check, body} from 'express-validator/check';
import { model } from 'mongoose';

import {
  getLogin,
  getSignup,
  postLogin,
  postSignup,
  postLogout,
  getReset,
  postReset,
  getNewPassword,
  postNewPassword
} from '../controllers/auth';

import { postLoginValidator, postSignupValidator } from '../validators';

const User = model('User');
const router = Router();

router.get('/login', getLogin);

router.get('/signup', getSignup);

router.post(
  '/login',
  postLoginValidator,
  postLogin
);

router.post(
  '/signup',
  postSignupValidator,
  postSignup
);

router.post('/logout', postLogout);

router.get('/reset', getReset);

router.post('/reset', postReset);

router.get('/reset/:token', getNewPassword);

router.post('/new-password', postNewPassword);

export default router;
