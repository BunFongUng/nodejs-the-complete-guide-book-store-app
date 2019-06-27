import {
    body
} from 'express-validator/check';

export const postAddProductValidator = [
    body('title')
    .isString()
    .isLength({
        min: 3
    })
    .trim(),
    body('price').isFloat(),
    body('description')
    .isLength({
        min: 5,
        max: 400
    })
    .trim()
];

export const postEditProductValidator = [
    body('title')
    .isString()
    .isLength({
        min: 3
    })
    .trim(),
    body('price').isFloat(),
    body('description')
    .isLength({
        min: 5,
        max: 400
    })
    .trim()
];

export const postLoginValidator = [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
      .normalizeEmail(),
    body('password', 'Password has to be valid.')
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim()
];

export const postSignupValidator = [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-Mail exists already, please pick a different one.'
            );
          }
        });
      })
      .normalizeEmail(),
    body(
      'password',
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
      .trim(),
    body('confirmPassword')
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords have to match!');
        }
        return true;
      })
];