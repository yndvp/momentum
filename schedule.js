const toDoForm = document.querySelector('.form-toDo'),
  toDoInput = document.querySelector('.input-toDO'),
  toDoList = document.querySelector('.toDoLi'),
  today = document.querySelector('.toDoItem');
const TODO_LS = 'toDos';

let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);

  const cleanToDo = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
  });

  toDos = cleanToDo;
  saveToDos();
  if (toDos.length === 0) {
    today.innerHTML = '';
    toDoList.style.backgroundColor = 'transparent';
  }
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  today.innerHTML = "Today's To Do";
  const newId = toDos.length + 1;
  delBtn.innerHTML = 'X';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoList.style.backgroundColor = '#CBC0AD';
  toDoInput.value = '';
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);
  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
  if (toDos.length === 0) {
    toDoList.style.background = 'transparent';
  } else {
    toDoList.style.backgroundColor = '#CBC0AD';
  }
}

init();
