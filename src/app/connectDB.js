const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'nodeapp'
});

pool.execute('select * from account')
  .then(([rows, fields]) => {
    console.log(rows);
  })
  .catch(error => {
    console.error(error);
  });

module.exports = pool;
