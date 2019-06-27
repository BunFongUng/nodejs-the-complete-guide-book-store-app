import path from 'path';

import express from 'express';

import './configs/database';
import middleware from './configs/middleware';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/auth';
import { get404, get500 } from './controllers/error';


const app = express();

/**
 * serving statics files  
 * */ 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));

/**
 * setting view engine 
 */
app.set('view engine', 'ejs');
app.set('views', 'views');


/**
 * set up middleware
 */
middleware(app);


app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', get500);

app.use(get404);

app.use((error, req, res, next) => {
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.session.isLoggedIn
  });
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});