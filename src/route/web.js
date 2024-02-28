import express from 'express';
import homeController from '../controller/homeController.js';
import connection from '../app/connectDB.js'; 
import multer from 'multer';

let router = express.Router();

const initWebRoute = (app) => {
    router.get('/login', homeController.getloginpage )
    router.get('/register', homeController.getSigninpage)
    router.get('/repass', homeController.getRepasspage)
    router.get('/profile/:id', homeController.getProfilepage)
    router.get('/home/pay', homeController.getPaypage)
    router.get('/home', homeController.getHomepage)
    router.get('/', homeController.gettest)
    router.get('/home/pay', homeController.getPaypage)
    router.post('/adduser', homeController.createUser);
    router.post('/checkin', homeController.checkin);
    router.post('/repas', homeController.Repass);
    router.post('/deletebook', homeController.Deletebook);
    router.post('/addbook', homeController.Addbook);
    router.post('/logout',homeController.logout)
    router.post('/readmes',homeController.readmes);
      return app.use('/',router) 
}

export default initWebRoute;