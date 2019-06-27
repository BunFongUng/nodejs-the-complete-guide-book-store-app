import path from 'path';

import { Router } from 'express';
import { body } from 'express-validator/check';

import { postAddProductValidator, postEditProductValidator } from '../validators';

import {
  getAddProduct,
  getProducts,
  getEditProduct,
  deleteProduct,
  postAddProduct,
  postEditProduct
} from '../controllers/admin';

import isAuth from '../middleware/is-auth';

const router = Router();

router.get('/add-product', isAuth, getAddProduct);

router.get('/products', isAuth, getProducts);

router.post('/add-product',
  postAddProductValidator,
  isAuth,
  postAddProduct
);

router.get('/edit-product/:productId', isAuth, getEditProduct);

router.post(
  '/edit-product',
  postEditProductValidator,
  isAuth,
  postEditProduct
);

router.delete('/product/:productId', isAuth, deleteProduct);

export default router;
