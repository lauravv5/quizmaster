document.addEventListener("DOMContentLoaded", () => {
    let record = localStorage.getItem("recordMax") || 0;
    document.getElementById("bestScore").textContent = `Mejor puntaje: ${record}`;
});
