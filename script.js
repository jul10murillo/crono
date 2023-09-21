// script.js
let running = false;
let startTime = null;
let elapsedTime = 0; // Nuevo

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
    elapsedTime = 0; // Reiniciar el tiempo transcurrido
}

resetButton.addEventListener("click", () => {
    resetTimer();
});

startStopButton.addEventListener("click", () => {
    if (!running) {
        if (startTime === null) {
            startTime = Date.now() - elapsedTime; // Restaurar el tiempo transcurrido
        }
        startStopButton.textContent = "Detener";
        startStopButton.classList.add("running");
        interval = setInterval(updateDisplay, 10);
    } else {
        clearInterval(interval);
        elapsedTime = Date.now() - startTime; // Al detener, calcula el tiempo transcurrido
    }
    running = !running;
});

function updateDisplay() {
    const currentTime = new Date(elapsedTime);
    const hours = String(currentTime.getUTCHours()).padStart(2, "0");
    const minutes = String(currentTime.getUTCMinutes()).padStart(2, "0");
    const seconds = String(currentTime.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(currentTime.getUTCMilliseconds()).padStart(3, "0");
    display.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}
