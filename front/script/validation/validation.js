export let errorsArr = [];

export function clearErorrsArr() {
  errorsArr = [];
}

export function addError(msg, field) {
  errorsArr.push({ message: msg, field });
}

function validateRequired(data, field) {
  if (!data) {
    addError('This field is required', field);
    return true;
  }
  return false;
}

function validateEmail(data, field) {
  const pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!pattern.test(data)) {
    addError('Must be a valid email', field);
    return true;
  }
  return false;
}

function validateMin(min, data, field) {
  if (data.length < min) {
    addError(`This field requires at least ${min} characters`, field);
    return true;
  }
  return false;
}

function validatePositiveNum(data, field) {
  if (data < 1) {
    addError(`Must be a positive number`, field);
    return true;
  }
  return false;
}

export function checkInput(data, field, rules) {
  for (const rule of rules) {
    if (rule === 'required') {
      if (validateRequired(data, field)) return;
    }
    if (rule === 'email') {
      if (validateEmail(data, field)) return;
    }
    if (rule.split('-')[0] === 'minlength') {
      const min = rule.split('-')[1];
      if (validateMin(min, data, field)) return;
    }
    if (rule === 'positivenum') {
      if (validatePositiveNum(data, field)) return;
    }
  }
}
