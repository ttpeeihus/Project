import mysql from 'mysql2/promise';

const pool = mysql.createPool ({
    host: MYSQL_HOST,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database:  MYSQL_DATABASE
    
});
const [rows,fields] = await pool.execute('select * from account');
console.log(rows);
export default pool;