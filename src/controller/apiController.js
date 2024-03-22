const pool = require('../app/connectDB.js');

let getAlluser = async (req, res) => {
    // let [rows, fields] = await pool.execute('select * from account ');
    // return res.status(200).json({
    //     message: 'oke',
    //     data: rows
    // });
};

let createUser = async (req, res) => {
    // const { user, pass, email } = req.body;
    // if (!user || !pass || !email) {
    //     return res.status(200).json({
    //         message: 'notoke',
    //     });
    // }
    // await pool.execute('INSERT INTO account (username, password, email) VALUES (?, ?, ?)', [user, pass, email]);
    // return res.status(200).json({
    //     message: 'oke',
    //     data: req.body
    // });
};

module.exports = {
    getAlluser,
    createUser,
};
