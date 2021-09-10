const inputText = document.querySelector('.control-text-field');
const inputNum = document.querySelector('.control-sum-field');
const addBtn = document.querySelector('.add-btn');
const totalElem = document.querySelector('.total');
const listContainer = document.getElementById('app-content');

let items = [];
let textValue = '';
let numValue = '';
let total = 0;

let editID = null;

const route = 'localhost:8000';

window.onload = () => {
  fetch(`http://${route}/getAllItems`)
    .then(response => response.json())
    .then(result => {
      items = result;
      calcTotal();
      render();
    });
}

const updateTextValue = (text) => {
  textValue = text;
};

const updateNumValue = (num) => {
  numValue = num; 
};

const addItem = () => {
  const tooltipValue  = document.querySelector('.tooltip-text');
  const tooltipNum  = document.querySelector('.tooltip-sum');
  
  if (!textValue) {
    showToolTip(tooltipValue, 'Поле не заполнено', 'tooltip-text--hidden');
  } 

  if (!numValue) {
    showToolTip(tooltipNum, 'Поле не заполнено', 'tooltip-sum--hidden');
  }

  if (isNaN(numValue)) {
    showToolTip(tooltipNum, 'Некорректное значение', 'tooltip-sum--hidden');
  }

  if (textValue && numValue && !isNaN(numValue)) {
    fetch(`http://${route}/createItem`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: textValue,
        sum: numValue
      })
    }).then(response => response.json())
      .then(result => {
        items = result;
        calcTotal();
        render();
      })
      .catch(e => alert('Повторите операцию, проверив данные'));

    textValue = '';
    numValue = '';
  
    inputText.value = '';
    inputNum.value = '';
  } 
};

const editItem = (index) => {
  editID = items[index].id;
  render();
};

const confirmChanges = (index, newText, newNum) => {

  if (newText && newNum && !isNaN(newNum)) {
    fetch(`http://${route}/updateItem`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        id: editID,
        text: newText,
        sum: newNum
      })
    }).then(response => response.json())
      .then(result => {
        editID = null;
        items = result;
        calcTotal();
        render();
      });
  }
};

const deleteItem = (index) => {
  editIdx = null;
  const delID = items[index].id;

  fetch(`http://${route}/deleteItem?id=${delID}`, {
    method: 'DELETE'
  }).then(response => response.json())
    .then(result => {
      items = result;
      calcTotal();
      render();
    });
};

const calcTotal = () => {
  total = 0;
  items.forEach((item) => {
    total += +item.sum;
  });

  total = `${splitDigits(total.toFixed(2))} р.`;
};

const render = () => {
  listContainer.innerHTML = '';
  totalElem.innerText = total;

  items.forEach((item, index) => {
    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item-container');
  
    const itemText = document.createElement('span');
    itemText.innerText = `${index + 1}. ${item.text} ${item.date}`;
    itemText.classList.add('item-text');

    const inputText = document.createElement('input');
    inputText.value = item.text;
    inputText.classList.add('input-text');
  
    const itemNum = document.createElement('span');
    itemNum.innerText = `${splitDigits(item.sum.toFixed(2))} р.`;
    itemNum.classList.add('item-sum');

    const inputNum = document.createElement('input');
    inputNum.value = item.sum;
    inputNum.classList.add('input-sum');
  
    const editBtn = document.createElement('button');
    editBtn.classList.add('item-edit-btn');

    const confirmBtn = document.createElement('button');
    confirmBtn.classList.add('item-confirm-btn');
  
    const delBtn = document.createElement('button');
    delBtn.classList.add('item-del-btn');

    if (item.id === editID) {
      itemContainer.append(inputText, inputNum, confirmBtn, delBtn);
    } else {
      itemContainer.append(itemText, itemNum, editBtn, delBtn);
    }

    listContainer.append(itemContainer);

    editBtn.addEventListener('click', () => editItem(index));
    confirmBtn.addEventListener('click', () => confirmChanges(index, inputText.value, inputNum.value));
    delBtn.addEventListener('click', () => deleteItem(index));
  });
}

const showToolTip = (elem, text, classToToggle) => {
  elem.innerText = text;
  elem.classList.remove(classToToggle);

  setTimeout(() => {
    elem.classList.add(classToToggle);
  }, 4000);
};

const splitDigits = (n) => String(n).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, "$1 ");

inputText.addEventListener('change', (e) => updateTextValue(e.target.value));
inputNum.addEventListener('change', (e) => updateNumValue(e.target.value));
addBtn.addEventListener('click', () => addItem());

