// Variables
let timer = 0;
let running = true;

// Función para iniciar el cronómetro
function start() {
  running = true;
  updateTimer();
}

// Función para pausar el cronómetro
function pause() {
  running = false;
}

// Función para reiniciar el cronómetro
function reset() {
  timer = 0;
  updateTimer();
}

// Función para actualizar el tiempo del cronómetro
function updateTimer() {
  let minutes = Math.floor(timer / 60);
  let seconds = Math.floor((timer % 60) / 10);
  let milliseconds = timer % 10;

  // Actualizamos la interfaz de usuario
  document.querySelector(".timer h1").textContent = `${minutes}:${seconds}:${milliseconds}`;

  // Si el cronómetro está en marcha, actualizamos el tiempo cada 100 milisegundos
  if (running) {
    setTimeout(updateTimer, 100);
  }
}

// Eventos
document.querySelector("#start").addEventListener("click", start);
document.querySelector("#pause").addEventListener("click", pause);
document.querySelector("#reset").addEventListener("click", reset);

// Iniciamos el cronómetro
updateTimer();
