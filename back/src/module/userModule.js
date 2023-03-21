const { reachDb } = require('../utils/dbconnection');
const { actionhash, comparehash } = require('../utils/hasher');
const { signtoken } = require('../utils/tokener');

async function findUser(credentials) {
  const { email, password } = credentials;
  try {
    const sql = 'SELECT * FROM users WHERE email=? LIMIT 1';
    const [data] = await reachDb(sql, [email]);
    if (!data) {
      return { success: false, msg: 'Try again or register' };
    }
    if (comparehash(password, data.password)) {
      const token = signtoken({ id: data.id });
      return { success: true, msg: 'Success login', token };
    }
    return { success: false, msg: 'Check email or password' };
  } catch (err) {
    console.log('findUser module error', err);
    throw new Error('findUser module error');
  }
}

async function addUser(credentials) {
  const { fullname, email, password } = credentials;
  const hashedpsw = actionhash(password);
  try {
    const sql = 'INSERT INTO users(full_name, email, password) VALUES(?, ?, ?)';
    const data = await reachDb(sql, [fullname, email, hashedpsw]);
    if (data.affectedRows === 1) {
      return { success: true, msg: 'Success registration' };
    }
    return { success: false, msg: 'Registration failed' };
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw err;
    }
    console.log('addUser module error', err);
    throw new Error('addUser module error');
  }
}

module.exports = { findUser, addUser };
