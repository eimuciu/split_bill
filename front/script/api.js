import { getToken } from './auth.js';
import { showMessage } from './helpers.js';

const BASE_URL = 'http://localhost:3000';

export async function loginApi(credentials) {
  try {
    const reachapi = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      showMessage('Unexpected server error', 'error');
    }
    console.log('loginApi fetch error', err.message);
  }
}

export async function registerApi(fullname, email, password) {
  try {
    const reachapi = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullname, email, password }),
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    if (err.message === 'Failed to fetch') {
      showMessage('Unexpected server error', 'error');
    }
    console.log('registerApi fetch error', err);
  }
}

export async function getUserGroupsApi() {
  try {
    const reachapi = await fetch(`${BASE_URL}/accounts`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('getUserGroupsApi fetch error', err);
  }
}

export async function postUserGroupApi(groupid) {
  try {
    const reachapi = await fetch(`${BASE_URL}/accounts`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_id: groupid }),
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('pstGroupApi fetch error', err);
  }
}

export async function getBillsApi(id) {
  try {
    const reachapi = await fetch(`${BASE_URL}/bills/${id}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('getBillsApi fetch error', err);
  }
}

export async function postBillApi(groupid, amount, description) {
  try {
    const reachapi = await fetch(`${BASE_URL}/bills`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ group_id: groupid, amount, description }),
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('postBillApi fetch error', err);
  }
}

export async function getGroupsList() {
  try {
    const reachapi = await fetch(`${BASE_URL}/groups`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('getGroupsList fetch error', err);
  }
}

export async function postNewGroup(groupname) {
  try {
    const reachapi = await fetch(`${BASE_URL}/groups`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: groupname }),
    });
    const data = await reachapi.json();
    return data;
  } catch (err) {
    console.log('postNewGroup fetch error', err);
  }
}
