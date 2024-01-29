import express from 'express';
import configview from './view/view.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express()
const port = process.env.PORT;

configview(app);

app.get('/login', (req, res) => {
  res.render('login.ejs');
})
app.get('/sigin', (req, res) => {
  res.render('sigin.ejs');
})
app.get('/repass', (req, res) => {
  res.render('repass.ejs');
})
app.get('/home', (req, res) => {
  res.render('home.ejs');
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})