const { reachDb } = require('../utils/dbconnection');

async function findGroups(uid) {
  try {
    const sql =
      'SELECT id, name FROM groups WHERE id NOT IN((SELECT groups.id FROM groups JOIN accounts ON groups.id=accounts.group_id WHERE user_id=?))';
    const data = await reachDb(sql, [uid]);
    return { success: true, msg: 'Data retrieved', data };
  } catch (err) {
    console.log('findGroups module error', err);
    throw new Error('findGroups module error');
  }
}

async function addGroup(groupname) {
  try {
    const sql = 'INSERT INTO groups(name) VALUES(?)';
    const data = await reachDb(sql, [groupname]);
    if (data.affectedRows === 1) {
      return [201, { success: true, msg: 'Group added' }];
    }
    return [400, { success: false, msg: 'Error occured while adding' }];
  } catch (err) {
    console.log('addGroup module error', err);
    throw new Error('addGroup module error');
  }
}

module.exports = {
  findGroups,
  addGroup,
};
