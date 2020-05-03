const weather = document.querySelector(".js-weather");

const API_KEY = "4e3b3d9b36805687e8498f7a259a9d8e";

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    ).then(function(response) {
        return response.json();
    }).then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}°C 
        ${place}`;
    });
}

function saveCoords(coordsObj) {
    localStorage.setItem('coords', JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("Can't acess geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords === null) {
        askForCoords();
    } else{
        const parsedCoords = JSON.parse(loadedCoords);
        const latitude = parsedCoords.latitude;
        const longitude = parsedCoords.longitude;
        getWeather(latitude, longitude);
    }
}

function init() {
    loadCoords();
}

init();
