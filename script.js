// script.js
let running = false;
let startTime = null;
let interval;
let selectedTime = 0; // Variable para almacenar el tiempo seleccionado en segundos
let currentTime = 0; // Variable para almacenar el tiempo transcurrido en segundos

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
    currentTime = selectedTime; // Establecer el tiempo actual al seleccionado
    display.textContent = formatTime(currentTime);
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
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Tiempo transcurrido en segundos
    currentTime = selectedTime - elapsedTime; // Tiempo restante en segundos

    if (currentTime <= 0) {
        // Mostrar mensaje al finalizar el tiempo
        currentTime = 0;
        display.textContent = "Tiempo terminado";
        clearInterval(interval);
    } else {
        display.textContent = formatTime(currentTime);
    }
}

function formatTime(time) {
    const hours = String(Math.floor(time / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, "0");
    const seconds = String(time % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
}

resetTimer(); // Iniciar con el tiempo seleccionado por defecto
