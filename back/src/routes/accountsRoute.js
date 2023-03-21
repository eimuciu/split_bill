const router = require('express').Router();
const { findAccounts, addAccount } = require('../module/accountsModule');
const { privateAuth } = require('../controller/userController');

router.get('/', privateAuth, async (req, res) => {
  const uid = req.uid;
  try {
    const resdata = await findAccounts(uid);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/accounts GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/', privateAuth, async (req, res) => {
  const uid = req.uid;
  const groupid = req.body.group_id;
  try {
    const [statuscode, resdata] = await addAccount(uid, groupid);
    res.status(statuscode).json(resdata);
  } catch (err) {
    console.log('/accounts POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { accountsRoutes: router };
