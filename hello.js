const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

function saveName(text) {
    localStorage.setItem("currentUser",text);
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function paintGreeting(text) {
    form.classList.add("hiding");
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) {
        greeting.innerHTML = `How's everything ${text}?`;
    } else if (hours < 12) {
        greeting.innerHTML = `Good morning ${text}`;
    } else if (hours < 18) {
        greeting.innerHTML = `Good afternoon ${text}`;
    } else {
        greeting.innerHTML = `Good evening ${text}`;
    }
}

function loadName() {
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser === null) {
        form.addEventListener("submit", handleSubmit);
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();
