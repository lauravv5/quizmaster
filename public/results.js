// Sacar el puntaje de la URL y mostrarlo
const params = new URLSearchParams(window.location.search);
const score = params.get("score");
// Asegúrate de que tienes un elemento con id="score" en results.html
if (document.getElementById("score")) {
    document.getElementById("score").textContent = score;
}

// Cargar leaderboard desde localStorage
// Inicializa con un array vacío si no existe nada en localStorage
let leaderboard = JSON.parse(localStorage.getItem("leaderboard") || "[]");

// Guardar puntaje en el leaderboard
// Asegúrate de que tienes un botón con id="save" y un input con id="name" en results.html
const saveButton = document.getElementById("save");

if (saveButton) {
    saveButton.addEventListener("click", () => {
        const nameInput = document.getElementById("name");
        const name = nameInput ? nameInput.value.trim() : "";

        if (name === "") {
            alert("Ingresa un nombre");
            return;
        }

        // Agregar la nueva entrada
        leaderboard.push({
            name,
            // Convertir el score a número antes de guardarlo
            score: Number(score),
            date: new Date().toLocaleDateString()
        });

        // Ordenar el leaderboard de mayor a menor puntaje
        leaderboard.sort((a, b) => b.score - a.score);

        // Mantener solo los 10 mejores puntajes
        leaderboard = leaderboard.slice(0, 10);

        // Guardar el leaderboard actualizado en localStorage
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        // Actualizar la visualización del leaderboard en la página
        loadLeaderboard();
        
        // Opcional: Deshabilitar el botón de guardar después de guardar una vez
        saveButton.disabled = true;
    });
}


// Mostrar leaderboard en la página
function loadLeaderboard() {
    const list = document.getElementById("leaderboard");
    
    // Asegúrate de que existe un elemento con id="leaderboard" (generalmente un <ul> o <ol>)
    if (list) {
        list.innerHTML = ""; // Limpiar la lista existente

        leaderboard.forEach(entry => {
            const li = document.createElement("li");
            // Usando template literals para construir la cadena
            li.textContent = `${entry.name} — ${entry.score} pts — ${entry.date}`; 
            list.appendChild(li);
        });
    }
}

// Cargar y mostrar el leaderboard al cargar la página results.html
loadLeaderboard();