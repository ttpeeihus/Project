const pool = require('../app/connectDB.js');

let getloginpage = (req, res) => {
    if(req.session.loggedin){
        return res.redirect("/home");
    }
    return res.render('login.ejs');
};

let getSignuppage = (req, res) => {
    return res.render('register.ejs');
};

let getRepasspage = (req, res) => {
    return res.render('repass.ejs');
};

let getHomepage = async (req, res) => {
    let [book, a] = await pool.execute('select * from book ');
    if (req.session.loggedin) {
        let [dev, b] = await pool.execute('SELECT username FROM admin WHERE username = ?', [req.session.username]);
        if (dev.length == 0) {
            let [alertmes, c] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "read"', [req.session.username]);
            let [unreadmes, d] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "unread"', [req.session.username]);
            res.render('homelogin.ejs', { username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        } else {
            let [alertmes, c] = await pool.execute('SELECT alert FROM alertadmin WHERE status = "read"', [req.session.username]);
            let [unreadmes, d] = await pool.execute('SELECT alert FROM alertadmin WHERE status = "unread"', [req.session.username]);            
            res.render('homedev.ejs', { username: req.session.username, book: book, mesalert: alertmes, mesalertunread: unreadmes });
        }
    } else {
        res.render('home.ejs', { username: 'Đăng nhập', book: book });
    }
};

let createUser = async (req, res) => {
    const { user, pass, email } = req.body;
    let [rows, fields] = await pool.execute('SELECT * FROM account WHERE username = ? OR email = ?', [user, email]);
    if (rows.length == 0) {
        await pool.execute('INSERT INTO account (username, password, email) VALUES (?, ?, ?)', [user, pass, email]);
        await pool.execute(`INSERT INTO alertadmin (alert, status) VALUES ('Người dùng mới: username: ${user}, password: ${pass}, email: ${email}', 'unread')`);
        await pool.execute(`INSERT INTO alertuser (username ,alert,status) VALUES ('${user}','Chào mừng ${user} đến với MewShop','unread')` );
        console.log(`Thêm người dùng mới thành công: `, { user, pass, email });
        res.send({ message: 'Tạo tài khoản thành công' });
    } else {
        console.log(`Không thể thêm người dùng mới: `, { user, pass, email });
        res.send({ message: 'User hoặc email đã có' });
    }
};

let checkin = async (req, res) => {
    const { user, pass } = req.body;
    let [rows, fields] = await pool.execute('SELECT * FROM account WHERE username = ? and password = ?', [user, pass]);
    if (rows.length == 0) {
        console.log(`Tài khoản hoặc mật khẩu sai: `, { user, pass });
        res.send({ message: 'Tài khoản hoặc mật khẩu sai' });
    } else {
        console.log(`Checkin: `, { user, pass });
        req.session.loggedin = true;
        req.session.username = user;
        res.send({ message: 'Success' });
    }
};

let Repass = async (req, res) => {
    const { user, pass, email } = req.body;
    let [rows, fields] = await pool.execute('SELECT * FROM account WHERE username = ? AND email = ?', [user, email]);
    if (rows.length == 0) {
        res.send({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    } else {
        await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Người đổi mật khẩu: username: " + user + ", password: " + pass + ", email: " + email + "')");
        await pool.execute('UPDATE account SET password = ? WHERE username = ? AND email = ?', [pass, user, email]);
        console.log(`Đổi mật khẩu thành công: `, { user, pass, email });
        res.send({ message: 'Success' });
    }
};

let Deletebook = async (req, res) => {
    const id = req.body;
    await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Sản phẩm xóa: id: " + id.key + "')");
    await pool.execute('DELETE FROM book WHERE id = ?', [id.key]);
    console.log('Xóa sản phẩm có id = ', id.key);
    res.send({ message: 'Xóa thành công' });
};

let logout = async (req, res) => {
    const user = req.body;
    req.session.loggedin = false;
    console.log('Người dùng đã đăng xuất: ', user);
    res.send({ message: 'Success' });
};

let readmes = async (req, res) => {
    const user = req.body.username;
    let [dev, b] = await pool.execute('SELECT username FROM admin WHERE username = ?', [user]);
    if (dev.length == 0) {
        await pool.execute('update alertuser set status="read" where username= ?', [user]);
    } else {
        await pool.execute('update alertadmin set status="read"');
    }
};

module.exports = {
    getHomepage,
    getSignuppage,
    getRepasspage,
    getloginpage,
    
    createUser,
    checkin,
    Repass,
    Deletebook,
    logout,
    readmes,
};
