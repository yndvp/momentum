const body = document.querySelector("body");

const imgNum = 4;

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber+1}.jpg`;
    image.classList.add('bgImage');
    image.onload = function() {
    body.appendChild(image);
    }
}

function getRandom() {
    const number = Math.floor(Math.random()*imgNum);
    return number;
}

function init() {
    const randomNumber = getRandom();
    paintImage(randomNumber);
}

init();