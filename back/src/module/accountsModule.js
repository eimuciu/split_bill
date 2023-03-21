const { reachDb } = require('../utils/dbconnection');

async function findAccounts(uid) {
  try {
    const sql =
      'SELECT groups.id, groups.name  FROM accounts JOIN groups ON accounts.group_id=groups.id WHERE user_id=?';
    const data = await reachDb(sql, [uid]);
    return { success: true, msg: 'Data retrieved', data };
  } catch (err) {
    console.log('findAccounts module error', err);
    throw new Error('findAccounts module error');
  }
}

async function addAccount(uid, groupid) {
  try {
    // Check if group exists
    const sqlA = 'SELECT * FROM groups WHERE id=?';
    const dataA = await reachDb(sqlA, [groupid]);
    if (!dataA.length) {
      return [200, { success: false, msg: 'Select your group carefully' }];
    }
    // Check if user belongs to group already
    const sqlB = 'SELECT * FROM accounts WHERE group_id=? AND user_id=?';
    const dataB = await reachDb(sqlB, [groupid, uid]);
    if (dataB.length) {
      return [200, { success: false, msg: 'You already belong to this group' }];
    }
    // Add user to group
    const sqlC = 'INSERT INTO accounts(group_id, user_id) VALUES(?,?)';
    const dataC = await reachDb(sqlC, [groupid, uid]);
    if (dataC.affectedRows === 1) {
      return [201, { success: true, msg: 'You added to group now' }];
    }
    // Any other case response
    return [400, { success: false, msg: 'Error occured while processing' }];
  } catch (err) {
    console.log('addAccount module error', err);
    throw new Error('addAccount module error');
  }
}

module.exports = { findAccounts, addAccount };
