const router = require('express').Router();
const { findBills, addBill } = require('../module/billsModule');
const { privateAuth } = require('../controller/userController');
const { validateData } = require('../middleware/dataValidation');

router.get('/:group_id', privateAuth, async (req, res) => {
  const { group_id } = req.params;
  try {
    const resdata = await findBills(group_id);
    res.status(200).json(resdata);
  } catch (err) {
    console.log('/bills GET route error', err);
    res.status(500).json('Something went wrong');
  }
});

router.post('/', privateAuth, validateData, async (req, res) => {
  const { group_id, amount, description } = req.body;
  try {
    const [statuscode, resdata] = await addBill(group_id, amount, description);
    res.status(statuscode).json(resdata);
  } catch (err) {
    console.log('/bills POST route error', err);
    res.status(500).json('Something went wrong');
  }
});

module.exports = { billsRoutes: router };
