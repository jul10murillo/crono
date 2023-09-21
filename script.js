// script.js
let running = false;
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
}

resetButton.addEventListener("click", () => {
    resetTimer();
});

startStopButton.addEventListener("click", () => {
    if (!running) {
        startStopButton.textContent = "Detener";
        startStopButton.classList.add("running");
        const currentTime = display.textContent.split(":");
        const hours = parseInt(currentTime[0]);
        const minutes = parseInt(currentTime[1]);
        const seconds = parseInt(currentTime[2]);
        const milliseconds = parseInt(currentTime[3]);
        const totalMilliseconds =
            hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
        const startTime = Date.now() - totalMilliseconds;
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
