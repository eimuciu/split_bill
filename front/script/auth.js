export function checkToken() {
  if (!sessionStorage.getItem('tkn')) {
    window.location.replace('index.html');
    return;
  }
  return true;
}

export function getToken() {
  return sessionStorage.getItem('tkn');
}

export function addToken(tkn) {
  sessionStorage.setItem('tkn', tkn);
}

export function removeToken() {
  sessionStorage.removeItem('tkn');
}
