import { checkInput, errorsArr } from './validation/validation.js';
import { clearErrors, handleErrors } from './validation/errorHandling.js';
import { checkToken, removeToken } from './auth.js';
import { getUserGroupsApi, postUserGroupApi, getGroupsList } from './api.js';
import { showMessage } from './helpers.js';

const { addgroupform, logoutbtn } = {
  addgroupform: document.getElementById('dataform'),
  logoutbtn: document.querySelector('.logoutBtn'),
};

function showpage() {
  document.body.style.display = 'block';
}

function simplecontainer(classname) {
  const container = document.createElement('div');
  container.className = classname;
  return container;
}

function attachClicklistener(el, action) {
  el.addEventListener('click', () => {
    action();
  });
}

function singleDataCard(dobj) {
  const container = simplecontainer('data-item');
  const { id, name } = dobj;
  // On card click action
  const actionCardClick = (cardid, groupname) => {
    window.location.href = `bills.html?id=${cardid}&groupname=${groupname}`;
  };
  // Attaching click listener to card container
  attachClicklistener(container, () => actionCardClick(id, name));
  // HTML card
  const card = `<h2>ID: ${id}</h2>
  <p>${name}</p>`;
  container.innerHTML = card;
  return container;
}

function paintAllCards(data) {
  const cardscontainer = document.querySelector('.data-container');
  cardscontainer.innerHTML = '';
  data.forEach((dObj) => {
    cardscontainer.append(singleDataCard(dObj));
  });
}

async function actionAddGroup(groupid) {
  try {
    const data = await postUserGroupApi(groupid);
    if (!data.success) {
      showMessage(data.msg, 'error');
      return;
    }
    getData();
  } catch (err) {
    console.log(err);
  }
}

function handleAddGroupForm() {
  addgroupform.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(addgroupform);
    const groupid = e.target.elements.groupfield.value.trim();
    checkInput(groupid, 'groupfield', ['required', 'positivenum']);
    if (errorsArr.length) {
      handleErrors(addgroupform);
      return;
    }
    actionAddGroup(groupid);
  });
}

function handleLogout() {
  removeToken();
  location.reload();
}

function fillGroupsFormWithData(data) {
  const selectForm = addgroupform.elements.groupfield;
  selectForm.innerHTML = '';
  selectForm.innerHTML = '<option></option>';
  data.forEach((groupObj) => {
    selectForm.innerHTML += `<option value="${groupObj.id}">${groupObj.name}</option>`;
  });
}

async function getData() {
  try {
    const data = await getUserGroupsApi();
    if (!data.success) {
      window.location.replace('index.html');
      return;
    }
    showpage();
    paintAllCards(data.data);
  } catch (err) {
    console.log(err);
  }
  try {
    const data = await getGroupsList();
    if (!data.success) {
      window.location.replace('index.html');
      return;
    }
    fillGroupsFormWithData(data.data);
  } catch (err) {
    console.log(err);
  }
}

function app() {
  if (checkToken()) {
    getData();
    handleAddGroupForm();
    attachClicklistener(logoutbtn, handleLogout);
  }
}

app();
