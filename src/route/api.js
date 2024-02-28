import express from 'express';
import apiController from '../controller/apiController.js';
let router = express.Router();
const initapi = (app) => {
    router.get('/users', apiController.getAlluser)
    router.post('/adduser', apiController.createUser)
    
      return app.use('/api/',router)
}

export default initapi;