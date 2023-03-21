const bcrypt = require('bcryptjs');

function actionhash(psw) {
  return bcrypt.hashSync(psw, 10);
}

function comparehash(plain, hashed) {
  return bcrypt.compareSync(plain, hashed);
}

module.exports = { actionhash, comparehash };
