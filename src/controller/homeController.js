import pool from '../app/connectDB.js'; 
import session from 'express-session';
// Trong file homeController.js
let getloginpage = (req, res) => {
    return res.render('login.ejs');
}
let getSigninpage = (req, res) => {
    return res.render('register.ejs');
}
let getRepasspage = (req, res) => {
    return res.render('repass.ejs');
}
let getProfilepage = async (req, res) => {
    let id = req.params.id;
    let [rows,fields] = await pool.execute('select * from user where id = ?',[id]);
    return res.send(JSON.stringify(rows));
}
let getPaypage = async (req, res) => {
    let [book,a] = await pool.execute('select * from book ');
    if (req.session.loggedin) {
        let[dev,b] =  await pool.execute('SELECT username FROM admin WHERE username = ?',[req.session.username]);
        if(dev.length==0){
            let [alertmes,c] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "read"',[req.session.username]);
            let [unreadmes,d] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "unread"',[req.session.username]);
		    res.render('pay.ejs',{username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        } else {
            let [alertmes,c] = await pool.execute('select * from alertadmin ');
            res.render('pay.ejs',{username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        }
        console.log('đăng nhập thành công');
	} else {
		res.render('home.ejs',{username: 'Đăng nhập',book: book});
        console.log('Chưa đăng nhập');
	}
}
let getHomepage = async (req, res) => {
    let [book,a] = await pool.execute('select * from book ');
    if (req.session.loggedin) {
        let[dev,b] =  await pool.execute('SELECT username FROM admin WHERE username = ?',[req.session.username]);
        if(dev.length==0){
            let [alertmes,c] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "read"',[req.session.username]);
            let [unreadmes,d] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "unread"',[req.session.username]);
		    res.render('homelogin.ejs',{username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        } else {
            let [alertmes,c] = await pool.execute('select * from alertadmin ');
            res.render('homedev.ejs',{username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        }
        console.log('đăng nhập thành công');
	} else {
		res.render('home.ejs',{username: 'Đăng nhập',book: book});
        console.log('Chưa đăng nhập');
	}
}
let createUser = async (req, res) => {
    const { user, pass, email } = req.body;
    let [rows,fields] = await pool.execute('SELECT * FROM account WHERE username = ? OR email = ?',[user, email]);
    if (rows.length == 0) { 
        await pool.execute('INSERT INTO account (username, password, email) VALUES (?, ?, ?)',[user,pass,email]);
        await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Người dùng mới: username: " + user + ", password: " + pass + ", email: " + email + "')");
        await pool.execute("INSERT INTO alertuser (username ,alert) VALUES (?,'Chào mừng " + user + " đến với MewShop')",[user]);
        console.log(`Thêm người dùng mới thành công: `, { user , pass, email });
        res.send({ message: 'Tạo tài khoản thành công' });
    } else { 
      console.log(`Không thể thêm người dùng mới: `, { user , pass, email });
      res.send({ message: 'User hoặc email đã có' });
    }
}
let checkin = async (req, res) => {
    const { user, pass } = req.body;
    let [rows,fields] = await pool.execute('SELECT * FROM account WHERE username = ? and password = ?',[user, pass]);
    if (rows.length == 0) { 
        console.log(`Tài khoản hoặc mật khẩu sai: `, { user , pass});
        res.send({ message: 'Tài khoản hoặc mật khẩu sai' });
    } else { 
      console.log(`Checkin: `, { user , pass});
      req.session.loggedin = true;
      req.session.username = user;
      res.send({ message: 'Success' });
    }
}
let Repass = async (req, res) => {
    const { user, pass, email } = req.body;
    let [rows,fields] = await pool.execute('SELECT * FROM account WHERE username = ? AND email = ?',[user, email]);
    if (rows.length == 0) { 
        res.send({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    } else { 
      await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Người đổi mật khẩu: username: " + user + ", password: " + pass + ", email: " + email + "')");
      await pool.execute('UPDATE account SET password = ? WHERE username = ? AND email = ?',[ pass, user, email]);  
      console.log(`Đổi mật khẩu thành công: `, { user , pass, email });
      res.send({ message: 'Success' });
    }
}
let Deletebook = async (req, res) => {
    const id = req.body;
    await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Sản phẩm xóa: id: " + id.key + "')");
    await pool.execute('DELETE FROM book WHERE id = ?',[id.key]);
    console.log('Xóa sản phẩm có id = ',id.key);
    res.send({ message: 'Xóa thành công' });
}
let Addbook = async (req, res) => {
    // const id = req.body;
    // await pool.execute('DELETE FROM book WHERE id = ?',[id.key]);
    // console.log('Xóa sách có id=',id.key);
    // res.send({ message: 'Xóa thành công' });
}
let logout = async (req, res) => {
    const user = req.body;
    req.session.loggedin = false;
    console.log('Người dùng đã đăng xuất: ',user);
    res.send({ message: 'Success' });
}
let readmes = async (req, res) => {
    const user = req.body.username;
    let[dev,b] =  await pool.execute('SELECT username FROM admin WHERE username = ?',[user]);
    if(dev.length==0){
        await pool.execute('update alertuser set status="read" where username= ?',[user]);
    } else {
        await pool.execute('update alertadmin set status="read" where username= ?',[user]);
    }
}
export default {
    getHomepage,
    getSigninpage,
    getRepasspage,
    getProfilepage,
    getloginpage,
    getPaypage,
    createUser,
    checkin,
    Repass,
    Deletebook,
    Addbook,
    logout,
    readmes,
}
