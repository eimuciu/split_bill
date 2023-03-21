import { checkInput, errorsArr, addError } from './validation/validation.js';
import { clearErrors, handleErrors } from './validation/errorHandling.js';
import { checkToken } from './auth.js';
import { getBillsApi, postBillApi } from './api.js';

const { addbillform } = {
  addbillform: document.getElementById('dataform'),
};

function showpage() {
  document.body.style.display = 'block';
}

function paramsvalue(search) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(search);
}

function tableRowItem(dobj) {
  const { id, amount, description } = dobj;
  const rowitem = `<tr>
  <td>${id}</td>
  <td>${description}</td>
  <td>€${amount}</td>
</tr>`;
  return rowitem;
}

function paintFullTable(data) {
  const table = document.querySelector('.data-container table tbody');
  const redtitle = document.querySelector('.red-title');
  table.innerHTML = '';
  redtitle.textContent = paramsvalue('groupname');
  data.forEach((dObj) => {
    table.innerHTML += tableRowItem(dObj);
  });
}

async function actionAddBill(groupid, amount, description) {
  try {
    const data = await postBillApi(groupid, amount, description);
    if (!data.success) {
      console.log(data);
      if (data.errors.length) {
        data.errors.forEach((errEl) => {
          addError(errEl[1], errEl[0]);
        });
        handleErrors(addbillform);
      }
      return;
    }
    getData();
  } catch (err) {
    console.log(err);
  }
}

function handleAddBillForm() {
  addbillform.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(addbillform);
    const groupid = paramsvalue('id');
    const amount = e.target.elements.amount.value.trim();
    const description = e.target.elements.description.value.trim();
    checkInput(amount, 'amount', ['required', 'positivenum']);
    checkInput(description, 'description', ['required']);
    if (errorsArr.length) {
      handleErrors(addbillform);
      return;
    }
    actionAddBill(groupid, amount, description);
  });
}

async function getData() {
  const groupid = paramsvalue('id');
  try {
    const data = await getBillsApi(groupid);
    if (!data.success) {
      window.location.replace('index.html');
      return;
    }
    showpage();
    paintFullTable(data.data);
  } catch (err) {
    console.log(err);
  }
}

function app() {
  if (checkToken()) {
    getData();
    handleAddBillForm();
  }
}

app();
