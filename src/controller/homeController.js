const pool = require('../app/connectDB.js');

// Render login page
let getLoginPage = (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/home");
    }
    return res.render('login.ejs');
};

// Render signup page
let getSignupPage = (req, res) => {
    return res.render('register.ejs');
};

// Render reset password page
let getResetPasswordPage = (req, res) => {
    return res.render('repass.ejs');
};

// Render home page
let getHomePage = async (req, res) => {
    let [books, bookFields] = await pool.execute('SELECT * FROM book');
    if (req.session.loggedIn) {
        let [admins, adminFields] = await pool.execute('SELECT username FROM admin WHERE username = ?', [req.session.username]);
        if (admins.length == 0) {
            let [readAlerts, readAlertFields] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "read"', [req.session.username]);
            let [unreadAlerts, unreadAlertFields] = await pool.execute('SELECT alert FROM alertuser WHERE username = ? AND status = "unread"', [req.session.username]);
            res.render('homelogin.ejs', { username: req.session.username, books: books, readAlerts: readAlerts, unreadAlerts: unreadAlerts });
        } else {
            let [readAlerts, readAlertFields] = await pool.execute('SELECT alert FROM alertadmin WHERE status = "read"');
            let [unreadAlerts, unreadAlertFields] = await pool.execute('SELECT alert FROM alertadmin WHERE status = "unread"');
            res.render('homedev.ejs', { username: req.session.username, books: books, readAlerts: readAlerts, unreadAlerts: unreadAlerts });
        }
    } else {
        res.render('home.ejs', { username: 'Đăng nhập', books: books });
    }
};

// Render payment page
let getPaymentPage = async (req, res) => {
    if (req.session.loggedIn) {
        let [cartItems, cartFields] = await pool.execute('SELECT * FROM shopping WHERE username = ?', [req.session.username]);
        if (cartItems.length == 0) {
            res.render('pay.ejs', { cart: "Giỏ hàng hiện tại chưa có gì", username: req.session.username });
        } else {
            res.render('pay.ejs', { cart: cartItems, username: req.session.username });
        }
    } else {
        return res.redirect("/login");
    }
};

// Create new user
let createUser = async (req, res) => {
    const { user, pass, email } = req.body;
    let [users, userFields] = await pool.execute('SELECT * FROM account WHERE username = ? OR email = ?', [user, email]);
    if (users.length == 0) {
        await pool.execute('INSERT INTO account (username, password, email) VALUES (?, ?, ?)', [user, pass, email]);
        await pool.execute(`INSERT INTO alertadmin (alert, status) VALUES ('Người dùng mới: username: ${user}, password: ${pass}, email: ${email}', 'unread')`);
        await pool.execute(`INSERT INTO alertuser (username, alert, status) VALUES ('${user}', 'Chào mừng ${user} đến với MewShop', 'unread')`);
        console.log(`Thêm người dùng mới thành công: `, { user, pass, email });
        res.send({ message: 'Tạo tài khoản thành công' });
    } else {
        console.log(`Không thể thêm người dùng mới: `, { user, pass, email });
        res.send({ message: 'User hoặc email đã có' });
    }
};

// User login
let userLogin = async (req, res) => {
    const { user, pass } = req.body;
    let [users, userFields] = await pool.execute('SELECT * FROM account WHERE username = ? and password = ?', [user, pass]);
    if (users.length == 0) {
        console.log(`Tài khoản hoặc mật khẩu sai: `, { user, pass });
        res.send({ message: 'Tài khoản hoặc mật khẩu sai' });
    } else {
        console.log(`Checkin: `, { user, pass });
        req.session.loggedIn = true;
        req.session.username = user;
        res.send({ message: 'Success' });
    }
};

// Reset password
let resetPassword = async (req, res) => {
    const { user, pass, email } = req.body;
    let [users, userFields] = await pool.execute('SELECT * FROM account WHERE username = ? AND email = ?', [user, email]);
    if (users.length == 0) {
        res.send({ message: 'Tài khoản hoặc mật khẩu không đúng' });
    } else {
        await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Người đổi mật khẩu: username: " + user + ", password: " + pass + ", email: " + email + "')");
        await pool.execute('UPDATE account SET password = ? WHERE username = ? AND email = ?', [pass, user, email]);
        console.log(`Đổi mật khẩu thành công: `, { user, pass, email });
        res.send({ message: 'Success' });
    }
};

// Delete book
let deleteBook = async (req, res) => {
    const id = req.body;
    await pool.execute("INSERT INTO alertadmin (alert) VALUES ('Sản phẩm xóa: id: " + id.key + "')");
    await pool.execute('DELETE FROM book WHERE id = ?', [id.key]);
    console.log('Xóa sản phẩm có id = ', id.key);
    res.send({ message: 'Xóa thành công' });
};

// User logout
let userLogout = async (req, res) => {
    const user = req.body;
    req.session.loggedIn = false;
    console.log('Người dùng đã đăng xuất: ', user);
    res.send({ message: 'Success' });
};

// Mark messages as read
let markMessagesRead = async (req, res) => {
    const user = req.body.username;
    let [admins, adminFields] = await pool.execute('SELECT username FROM admin WHERE username = ?', [user]);
    if (admins.length == 0) {
        await pool.execute('update alertuser set status="read" where username= ?', [user]);
    } else {
        await pool.execute('update alertadmin set status="read"');
    }
};

// Add new product (Functionality not yet implemented)
let addProduct = async (req, res) => {
    const user = req.body.username;
    // Implementation needed
};

module.exports = {
    getLoginPage,
    getSignupPage,
    getResetPasswordPage,
    getHomePage,
    getPaymentPage,
    
    createUser,
    userLogin,
    resetPassword,
    deleteBook,
    userLogout,
    markMessagesRead,
    addProduct,
};
