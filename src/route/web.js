const express = require('express');
const homeController = require('../controller/homeController.js');

const router = express.Router();

const initWebRoute = (app) => {
    router.get('/login', homeController.getloginpage);
    router.get('/register', homeController.getSignuppage);
    router.get('/repass', homeController.getRepasspage);
    router.get('/home', homeController.getHomepage);

    router.post('/adduser', homeController.createUser);
    router.post('/checkin', homeController.checkin);
    router.post('/repas', homeController.Repass);
    router.post('/deletebook', homeController.Deletebook);
    router.post('/logout', homeController.logout);
    router.post('/readmes', homeController.readmes);

    // Sử dụng EJS làm view engine
    app.set("view engine", "ejs");
    app.set("views", "./src/page");

    // Sử dụng cú pháp module.exports để tương thích với CommonJS
    return app.use('/', router);
}

module.exports = initWebRoute;
