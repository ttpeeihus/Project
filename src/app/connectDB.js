const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'nodeapp'
});

/* deploy Cpanel
const pool = mysql.createPool({
  host: 'localhost',
  user: 'nguyen88_shopee',
  password: '1Gs6a^u]~A{j',
  database: 'nguyen88_shopee'
});
*/

pool.execute('select * from account')
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(error => {
    console.error(error);
  });

module.exports = pool;
