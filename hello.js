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
    greeting.innerHTML = `Hello, ${text}`;
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
