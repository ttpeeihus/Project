const express = require('express');
const configview = require('./app/view.js');
const initWebRoute = require('./route/web.js');
const initapi = require('./route/api.js');
const dotenv = require('dotenv');
const session = require('express-session');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(session({
	secret: 'some secret',
	resave: false,
	saveUninitialized: false,
	cookie: {
	  maxAge: 30 * 60 * 1000
	}
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configview(app);
initWebRoute(app);
initapi(app);

app.use((req, res, next) => {
	res.status(404).sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
