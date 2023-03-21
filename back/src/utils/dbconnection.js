const mysql = require('mysql2/promise');
const { dbconfig } = require('../config');

async function reachDb(sql, dataToDBArr) {
  let connection;
  try {
    connection = await mysql.createConnection(dbconfig);
    const [data] = await connection.execute(sql, dataToDBArr);
    return data;
  } catch (err) {
    throw err;
  } finally {
    await connection?.end();
  }
}

module.exports = { reachDb };
