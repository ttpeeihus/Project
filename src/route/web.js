const express = require('express');
const homeController = require('../controller/homeController.js');

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/login', homeController.getLoginPage);
    router.get('/register', homeController.getSignupPage);
    router.get('/repass', homeController.getResetPasswordPage);
    router.get('/home', homeController.getHomePage);
    router.get('/home/pay', homeController.getPaymentPage);

    router.post('/adduser', homeController.createUser);
    router.post('/checkin', homeController.userLogin);
    router.post('/repas', homeController.resetPassword);
    router.post('/deletebook', homeController.deleteBook);
    router.post('/logout', homeController.userLogout);
    router.post('/readmes', homeController.markMessagesRead);
    router.post('/addproduct', homeController.addProduct);

    // Sử dụng EJS làm view engine
    app.set("view engine", "ejs");
    app.set("views", "./src/page");

    // Sử dụng cú pháp module.exports để tương thích với CommonJS
    return app.use('/', router);
}

module.exports = initWebRoute;
