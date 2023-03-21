import { checkInput, errorsArr } from './validation/validation.js';
import { clearErrors, handleErrors } from './validation/errorHandling.js';
import { loginApi } from './api.js';
import { addToken } from './auth.js';

const { loginform } = {
  loginform: document.getElementById('dataform'),
};

async function actionLogin(credentials) {
  try {
    const data = await loginApi(credentials);
    addToken(data.token);
    window.location.replace('groups.html');
  } catch (err) {
    console.log(err);
  }
}

function handleLoginForm() {
  loginform.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors(loginform);
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();
    checkInput(email, 'email', ['required', 'email']);
    checkInput(password, 'password', ['required', 'minlength-8']);
    if (errorsArr.length) {
      handleErrors(loginform);
      return;
    }
    actionLogin({ email, password });
  });
}

function app() {
  handleLoginForm();
}

app();
