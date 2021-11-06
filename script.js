// Variables
const clockTitle = document.querySelector('.time');
const form = document.querySelector('.form-name');
const input = document.querySelector('.input-name');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');

///////////////////////////////////////
// Display time
// Get time
function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours} : ${
    minutes < 10 ? `0${minutes}` : minutes
  }`;
}

// Load and refresh the time
getTime();
setInterval(getTime, 1000);

///////////////////////////////////////
// Display greeting
// Save name in the local storage
function saveName(text) {
  localStorage.setItem('currentUser', text);
}

// When name is submitted, display greeting and call saveName function
function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

// Display greeting
function paintGreeting(name) {
  form.classList.add('hidden');
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6) {
    greeting.innerHTML = `How's everything ${name}?`;
  } else if (hours < 12) {
    greeting.innerHTML = `Good morning ${name}!`;
  } else if (hours < 18) {
    greeting.innerHTML = `Good afternoon ${name}!`;
  } else {
    greeting.innerHTML = `Good evening ${name}!`;
  }
}

// Try to get user name stored in local storage
function loadName() {
  const currentUser = localStorage.getItem('currentUser');
  if (currentUser === null) {
    form.addEventListener('submit', handleSubmit);
  } else {
    paintGreeting(currentUser);
  }
}

// Load name
loadName();

///////////////////////////////////////
// Background changing
// Display image
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  image.classList.add('bgImage');
  image.onload = function () {
    body.appendChild(image);
  };
}

// Create random number
function getRandom() {
  const numOfImg = 4;
  const number = Math.floor(Math.random() * numOfImg);
  return number;
}
const randomNumber = getRandom();

// Display image corresponded to created random number
paintImage(randomNumber);

///////////////////////////////////////
// Display weather
const displayWeather = function () {
  const weather = document.querySelector('.weather');

  const API_KEY = '4e3b3d9b36805687e8498f7a259a9d8e';

  // Get weather using API
  function getWeather(lat, lon) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    )
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerHTML = `<span class="temp">${temperature}°C</span><br> 
        ${place}`;
      });
  }

  function saveCoords(coordsObj) {
    localStorage.setItem('coords', JSON.stringify(coordsObj));
  }

  // If the user agree to get geolocation, lauch this function
  function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
      latitude,
      longitude,
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
  }

  // If the user refuses to get geolocation or an error occurs, launch this function
  function handleGeoError() {
    console.log("Can't access geolocation");
  }

  // Get coordinates
  function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
  }

  // Load coordinates from local storage and get weather based on it
  function loadCoords() {
    const loadedCoords = localStorage.getItem('coords');
    if (loadedCoords === null) {
      askForCoords();
    } else {
      const parsedCoords = JSON.parse(loadedCoords);
      const latitude = parsedCoords.latitude;
      const longitude = parsedCoords.longitude;
      getWeather(latitude, longitude);
    }
  }
  loadCoords();
};

displayWeather();

///////////////////////////////////////
// Update To do list
const getToDo = function () {
  const toDoForm = document.querySelector('.form-toDo'),
    toDoInput = document.querySelector('.input-toDo'),
    toDoList = document.querySelector('.toDoLi');
  const TODO_LS = 'toDos';

  let toDos = [];

  // Delete to-do item
  function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    // Remove speific item from screen
    toDoList.removeChild(li);

    // Remove specific item from toDos array and save the new array in local storage
    const cleanToDo = toDos.filter(function (toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDo;
    saveToDos();
  }

  // Save added to-do item in local storage
  function saveToDos() {
    localStorage.setItem(TODO_LS, JSON.stringify(toDos));
  }

  // Display to do item with passed value
  function paintToDo(text) {
    const li = document.createElement('li');
    const delBtn = document.createElement('button');
    const span = document.createElement('span');
    const newId = toDos.length + 1;

    delBtn.innerHTML = 'X';
    delBtn.addEventListener('click', deleteToDo);
    span.innerText = text;

    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    li.classList.add('toDoItem');
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
    toDoInput.value = '';
  }

  // Try to get to do lists from local storage
  function loadToDos() {
    const loadedToDos = localStorage.getItem(TODO_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function (toDo) {
        paintToDo(toDo.text);
      });
    }
  }
  loadToDos();

  // Add event handler to to-do form
  toDoForm.addEventListener('submit', handleSubmit);
};

getToDo();
