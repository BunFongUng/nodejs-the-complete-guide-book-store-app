import bodyParser from 'body-parser';
import morgan from 'morgan';
import session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);
import csrf from 'csurf';
import flash from 'connect-flash';
import multer from 'multer';

import { model } from 'mongoose';

const User = model('User');

export default app => {
    
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + '-' + file.originalname);
        }
    });

    const fileFilter = (req, file, cb) => {
        if (
            file.mimetype === 'image/png' ||
            file.mimetype === 'image/jpg' ||
            file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    const store = new MongoDBStore({
        uri: process.env.DEV_DB_URL,
        collection: 'sessions'
    });

    const csrfProtection = csrf();

    app.use(morgan('dev'));

    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(
        multer({
            storage: fileStorage,
            fileFilter: fileFilter
        }).single('image')
    );

    app.use(
        session({
            secret: 'my secret',
            resave: false,
            saveUninitialized: false,
            store: store
        })
    );

    app.use(csrfProtection);

    app.use(flash());

    app.use((req, res, next) => {
        res.locals.isAuthenticated = req.session.isLoggedIn;
        res.locals.csrfToken = req.csrfToken();
        next();
    });

    app.use((req, res, next) => {
        if (!req.session.user) {
            return next();
        }
        User.findById(req.session.user._id)
            .then(user => {
                if (!user) {
                    return next();
                }
                req.user = user;
                next();
            })
            .catch(err => {
                next(new Error(err));
            });
    });
}