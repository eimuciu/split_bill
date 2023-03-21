const router = require('express').Router();
const { findGroups, addGroup } = require('../module/groupsModule');
const { privateAuth } = require('../controller/userController');
const { validateData } = require('../middleware/dataValidation');

router.get('/', privateAuth, async (req, res) => {
  const uid = req.uid;
  try {
    const resdata = await findGroups(uid);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/groups GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/', privateAuth, validateData, async (req, res) => {
  const { name } = req.body;
  try {
    const [statuscode, resdata] = await addGroup(name);
    res.status(statuscode).json(resdata);
  } catch (err) {
    console.log('/bills POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { groupsRoutes: router };
