require('dotenv').config();

const PORT = process.env.SERVER_PORT;

const dbconfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSWD,
  database: process.env.DB_NAME,
};

module.exports = { PORT, dbconfig };
