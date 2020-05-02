const API_KEY = "4e3b3d9b36805687e8498f7a259a9d8e";

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
    saveCoords(coordsObj)
}

function handleGeoError() {
    console.log("Can't aceess geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem('coords');
    if(loadedCoords === null) {
        askForCoords();
    } else{
        //getWeather();
    }
}

function init() {
    loadCoords();
}

init();