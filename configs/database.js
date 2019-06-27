require('dotenv').config();

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

try {
    /**
     * using the different mongodb url base on
     * environment
     */
    if (process.env.NODE_ENV === 'development') {
        mongoose.connect(process.env.DEV_DB_URL, {
            useNewUrlParser: true
        });
    } else {
        mongoose.connect(process.env.PROD_DB_URL, {
            useNewUrlParser: true
        });
    }
} catch (error) {
    if (process.env.NODE_ENV === 'development') {
        mongoose.createConnection(process.env.DEV_DB_URL, {
            useNewUrlParser: true
        });
    } else {
        mongoose.createConnection(process.env.PROD_DB_URL, {
            useNewUrlParser: true
        });
    }
}

/**
 * includes all of our models here
 */
import '../models/order';
import '../models/product';
import '../models/user';

 /**
 * display the message of which mongoDB url connected
 * if mongoose connection is success.
 *
 * otherwise will throw the error.
 */
mongoose.connection
.once('open', () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`MongoDB connected to: ${process.env.DEV_DB_URL}`);
    } else {
        console.log(`MongoDB connected to: ${process.env.PROD_DB_URL}`);
    }
})
.on('error', error => {
    throw error;
})