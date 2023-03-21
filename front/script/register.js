import { checkInput, errorsArr, addError } from './validation/validation.js';
import { clearErrors, handleErrors } from './validation/errorHandling.js';
import { registerApi } from './api.js';
import { showMessage } from './helpers.js';

const { registerForm } = {
  registerForm: document.getElementById('dataform'),
};

async function actionRegistration(fullname, email, password) {
  try {
    const apiresp = await registerApi(fullname, email, password);
    if (!apiresp.success) {
      showMessage(apiresp.msg, 'error');
      console.log(apiresp);
      return;
    }
    showMessage(apiresp.msg, 'success');
    setTimeout(() => {
      window.location.replace('index.html');
    }, 2000);
  } catch (err) {
    console.log(err);
  }
}

function handleRegisterForm() {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(registerForm);
    const fullname = e.target.elements.fullname.value.trim();
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();
    const repeatpassword = e.target.elements.repeatpassword.value.trim();
    checkInput(fullname, 'fullname', ['required']);
    checkInput(email, 'email', ['required', 'email']);
    checkInput(password, 'password', ['required', 'minlength-8']);
    if (password !== repeatpassword) {
      addError('Passwords must match', 'repeatpassword');
    }
    if (errorsArr.length) {
      handleErrors(registerForm);
      return;
    }
    actionRegistration(fullname, email, password);
  });
}

function app() {
  handleRegisterForm();
}

app();
