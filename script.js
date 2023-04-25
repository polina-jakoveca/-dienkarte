const form = document.querySelector('form');
const menuList = document.querySelector('#menu');

form.addEventListener('submit', event => {
  event.preventDefault();

  const name = form.elements['name'].value;
  const description = form.elements['description'].value;
  const price = form.elements['price'].value;

  // Отправляем данные на сервер
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/menu');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = () => {
    const menu = JSON.parse(xhr.responseText);
    renderMenu(menu);
  };
  xhr.send(JSON.stringify({ name, description, price }));
});

// Получаем данные с сервера и отображаем их на странице
const xhr = new XMLHttpRequest();
xhr.open('GET', '/api/menu');
xhr.onload = () => {
  const menu = JSON.parse(xhr.responseText);
  renderMenu(menu);
};
xhr.send();

function renderMenu(menu) {
  menuList.innerHTML = '';
  for (const item of menu) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${item.name}</strong> (${item.price} рублей)<br>${item.description}`;
    menuList.appendChild(li);
  }
}