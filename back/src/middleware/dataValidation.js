const joi = require('joi');
const { reformatError } = require('../utils/errorFormatter');

const billsschema = joi
  .object({
    group_id: joi.number().required(),
    amount: joi.number().required(),
    description: joi.string().trim().required(),
  })
  .options({ abortEarly: false });

const groupsschema = joi
  .object({
    name: joi.string().trim().required(),
  })
  .options({ abortEarly: false });

async function validateData(req, res, next) {
  const { baseUrl } = req;
  try {
    let data = req.body;
    if (baseUrl === '/bills') {
      data = await billsschema.validateAsync(data);
    }
    if (baseUrl === '/groups') {
      data = await groupsschema.validateAsync(data);
    }
    req.body = data;
    next();
  } catch (err) {
    res.status(400).json(reformatError(err));
  }
}

module.exports = { validateData };
