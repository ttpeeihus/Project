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
/* deploy Cpanel
const express = require('express');
const configview = require('./app/view.js');
const initWebRoute = require('./route/web.js');
const initapi = require('./route/api.js');
const dotenv = require('dotenv');
const session = require('express-session');
const path = require('path');
const http = require('http');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Giá trị mặc định là 3000, nhưng cPanel sẽ cung cấp cổng khác

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 60 * 1000 // 30 phút
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configview(app);
initWebRoute(app);
initapi(app);

// Xử lý lỗi 404
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

// Tạo HTTP server
const server = http.createServer(app);

// Bắt đầu lắng nghe kết nối
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
*/