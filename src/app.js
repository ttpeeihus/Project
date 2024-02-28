import express from 'express';
import configview from './app/view.js';
import connection from './app/connectDB.js';
import bodyParser from 'body-parser';
import initWebRoute from './route/web.js'
import initapi from './route/api.js'
import dotenv from 'dotenv';
import session from 'express-session';
dotenv.config();

const app = express()
const port = process.env.PORT;

app.use(session({
	secret: 'some secret', // Một chuỗi bí mật để mã hóa cookie phiên
	resave: false, // Không lưu lại phiên nếu không có thay đổi
	saveUninitialized: false, // Không lưu lại phiên nếu chưa khởi tạo
	cookie: {
	  maxAge: 30 * 60 * 1000 // Giới hạn thời gian của phiên là 30 phút
	}
  }));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

configview(app);
initWebRoute(app);
initapi(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})