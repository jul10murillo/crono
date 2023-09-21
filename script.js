// script.js
let running = false;
let startTime = null;
let interval;
let selectedTime = 0; // Variable para almacenar el tiempo seleccionado

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const tiempoSelect = document.getElementById("tiempo");

tiempoSelect.addEventListener("change", () => {
    selectedTime = parseInt(tiempoSelect.value);
    resetTimer();
});

function resetTimer() {
    clearInterval(interval);
    running = false;
    startStopButton.textContent = "Iniciar";
    startStopButton.classList.remove("running");
    display.textContent = formatTime(selectedTime); // Mostrar el tiempo seleccionado
    startTime = null;
}

resetButton.addEventListener("click", () => {
    resetTimer();
});

startStopButton.addEventListener("click", () => {
    if (!running) {
        if (startTime === null) {
            startTime = Date.now() - (selectedTime * 1000); // Iniciar desde el tiempo seleccionado
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
    const timeRemaining = Math.max(selectedTime * 1000 - currentTime.getTime(), 0);

    if (timeRemaining === 0) {
        // Mostrar mensaje al finalizar el tiempo
        display.textContent = "Tiempo terminado";
        clearInterval(interval);
    } else {
        display.textContent = formatTime(timeRemaining);
    }
}

function formatTime(time) {
    const date = new Date(time);
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    const seconds = String(date.getUTCSeconds()).padStart(2, "0");
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

resetTimer(); // Iniciar con el tiempo seleccionado por defecto
