const ul = document.querySelector('ul');
const input = document.getElementById('location');
const addButton = document.getElementById('addButton');
const removeButton = document.getElementById('removeButton');
let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) :
[];

localStorage.setItem('items', JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem('items'));

const listMaker = text => {
  const li = document.createElement('li');
  li.textContent = text;
  ul.appendChild(li);
}

const addTrip = event => {
  itemsArray.push(input.value);
  localStorage.setItem('items', JSON.stringify(itemsArray));
  listMaker(input.value);
  input.value = ''
}

data.forEach(item => function() {
  listMaker(item);
})

const removeTrip = event => {
  localStorage.clear();
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
}

export { addTrip, removeTrip }
