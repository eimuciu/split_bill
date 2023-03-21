const router = require('express').Router();
const { findUser, addUser } = require('../module/userModule');
const { validateCredentials } = require('../middleware/userValidation');

router.post('/login', validateCredentials, async (req, res) => {
  const credentials = req.body;
  try {
    const resdata = await findUser(credentials);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/login route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/register', validateCredentials, async (req, res) => {
  const credentials = req.body;
  try {
    const resdata = await addUser(credentials);
    res.status(201).json(resdata);
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, msg: 'Try another email' });
      return;
    }
    console.log('/register route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { authRoutes: router };
