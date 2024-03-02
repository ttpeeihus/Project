import express from 'express';
import configview from './app/view.js';
import connection from './app/connectDB.js';
import bodyParser from 'body-parser';
import initWebRoute from './route/web.js'
import initapi from './route/api.js'
import dotenv from 'dotenv';
import session from 'express-session';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
// Sau khi khai báo tất cả các route của bạn
app.use((req, res, next) => {
	// Nếu không có route nào khớp với đường dẫn của người dùng
	// Thì gửi file 404.html cho người dùng
	res.status(404).sendFile(__dirname + '/public/404.html');
  });
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})