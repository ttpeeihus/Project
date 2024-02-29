import mysql from 'mysql2/promise';

const pool = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database:  'nodeapp'

});
const [rows,fields] = await pool.execute('select * from account');
console.log(rows);
export default pool;