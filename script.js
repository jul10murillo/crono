// script.js
let running = false;
let startTime;
let interval;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

startStopButton.addEventListener("click", () => {
    if (!running) {
        startStopButton.textContent = "Detener";
        startStopButton.classList.add("running");
        startTime = Date.now() - (startTime ? startTime : 0);
        interval = setInterval(updateDisplay, 10);
    } else {
        startStopButton.textContent = "Iniciar";
        startStopButton.classList.remove("running");
        clearInterval(interval);
    }
    running = !running;
});

resetButton.addEventListener("click", () => {
    startStopButton.textContent = "Iniciar";
    startStopButton.classList.remove("running");
    clearInterval(interval);
    running = false;
    display.textContent = "00:00:00";
    startTime = null;
});

function updateDisplay() {
    const currentTime = new Date(Date.now() - startTime);
    const hours = String(currentTime.getUTCHours()).padStart(2, "0");
    const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(currentTime.getUTCMilliseconds()).padStart(3, "0");
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
