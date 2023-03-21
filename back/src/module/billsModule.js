const { reachDb } = require('../utils/dbconnection');

async function findBills(groupId) {
  try {
    const sql = 'SELECT * FROM bills WHERE group_id=?';
    const data = await reachDb(sql, [groupId]);
    return { success: true, msg: 'Data retrieved', data };
  } catch (err) {
    console.log('findBills module error', err);
    throw new Error('findBills module error');
  }
}

async function addBill(group_id, amount, description) {
  try {
    const sql =
      'INSERT INTO bills(group_id, amount, description) VALUES(?,?,?)';
    const data = await reachDb(sql, [group_id, amount, description]);
    if (data.affectedRows === 1) {
      return [201, { success: true, msg: 'Bill added' }];
    }
    return [400, { success: false, msg: 'Error occured while adding' }];
  } catch (err) {
    console.log('addBill module error', err);
    throw new Error('addBill module error');
  }
}

module.exports = { findBills, addBill };
