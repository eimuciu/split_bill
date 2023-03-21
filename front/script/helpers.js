export function showMessage(message, type) {
  const container = document.createElement('div');
  container.style.maxWidth = '25%';
  container.style.padding = '10px 20px';
  container.style.position = 'fixed';
  container.style.top = '25px';
  container.style.right = '25px';
  container.style.zIndex = '1';
  container.style.color = `${
    type === 'success' ? 'green' : type === 'error' ? 'red' : 'black'
  }`;
  container.style.border = `1px solid ${
    type === 'success' ? 'green' : type === 'error' ? 'red' : 'black'
  }`;
  container.textContent = message;

  document.body.append(container);

  setTimeout(() => {
    container.remove();
  }, 3000);
}
