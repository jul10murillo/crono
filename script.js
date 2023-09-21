// script.js
let running = false;
let startTime = null;
let interval;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");

function resetTimer() {
    clearInterval(interval);
    running = false;
    startStopButton.textContent = "Iniciar";
    startStopButton.classList.remove("running");
    display.textContent = "00:00:00.000";
    startTime = null;
}

resetButton.addEventListener("click", () => {
    resetTimer();
});

startStopButton.addEventListener("click", () => {
    if (!running) {
        if (startTime === null) {
            startTime = Date.now();
        }
        startStopButton.textContent = "Detener";
        startStopButton.classList.add("running");
        interval = setInterval(updateDisplay, 10);
    } else {
        clearInterval(interval);
    }
    running = !running;
});

function updateDisplay() {
    const currentTime = new Date(Date.now() - startTime);
    const hours = String(currentTime.getUTCHours()).padStart(2, "0");
    const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(currentTime.getUTCMilliseconds()).padStart(3, "0");
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
