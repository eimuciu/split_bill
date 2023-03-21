import { clearErorrsArr, errorsArr } from './validation.js';

export function clearErrors(formel) {
  for (const error of errorsArr) {
    const formfield = formel.elements[error.field];
    formfield.previousElementSibling.textContent = '';
    formfield.classList.remove('errorMark');
  }
  clearErorrsArr();
}

export function handleErrors(formel) {
  for (const error of errorsArr) {
    const formfield = formel.elements[error.field];
    formfield.previousElementSibling.textContent = error.message;
    formfield.classList.add('errorMark');
  }
}
