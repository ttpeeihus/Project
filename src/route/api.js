// Chuyển từ import sang require cho sự tương thích với CommonJS
const express = require('express');
const apiController = require('../controller/apiController.js');

const router = express.Router();

const initapi = (app) => {
    router.get('/users', apiController.getAlluser);
    router.post('/adduser', apiController.createUser);

    // Sử dụng cú pháp module.exports để tương thích với CommonJS
    return app.use('/api/', router);
}

module.exports = initapi;
