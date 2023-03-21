import { checkInput, errorsArr } from './validation/validation.js';
import { clearErrors, handleErrors } from './validation/errorHandling.js';
import { checkToken } from './auth.js';
import { postNewGroup } from './api.js';
import { showMessage } from './helpers.js';

const { addgroupform } = {
  addgroupform: document.getElementById('dataform'),
};

function showpage() {
  document.body.style.display = 'block';
}

async function actionAddGroup(name) {
  try {
    const data = await postNewGroup(name);
    if (!data.success) {
      showMessage(data.msg, 'error');
      return;
    }
    showMessage(data.msg, 'success');
  } catch (err) {
    console.log(err);
  }
}

function handleAddGroupForm() {
  addgroupform.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(addgroupform);
    const groupname = e.target.elements.groupname.value.trim();
    checkInput(groupname, 'groupname', ['required']);
    if (errorsArr.length) {
      handleErrors(addgroupform);
      return;
    }
    actionAddGroup(groupname);
    addgroupform.reset();
  });
}

function app() {
  if (checkToken()) {
    handleAddGroupForm();
    showpage();
    return;
  }
}

app();
