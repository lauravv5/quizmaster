// ===============================
// 1. TOMAR CATEGORÍA DE LA URL
// ===============================
const params = new URLSearchParams(window.location.search);
const category = params.get("category"); // ← ahora coincide con categories.html

console.log("Categoría seleccionada:", category);

// ===============================
// 2. BASE DE PREGUNTAS POR CATEGORÍA
// ===============================
const questions = {
    cultura: [
        {
            question: "¿Cuál es la capital de Francia?",
            options: ["Roma", "Madrid", "París", "Berlín"],
            correct: 2
        },
        {
            question: "¿Qué imperio construyó el Coliseo?",
            options: ["Griego", "Egipcio", "Romano", "Persa"],
            correct: 2
        }
    ],

    ciencia: [
        {
            question: "¿Cuál es el planeta más grande del sistema solar?",
            options: ["Marte", "Júpiter", "Saturno", "Neptuno"],
            correct: 1
        },
        {
            question: "¿Qué gas respiramos principalmente?",
            options: ["Oxígeno", "Nitrógeno", "CO₂", "Helio"],
            correct: 1
        }
    ],

    entretenimiento: [
        {
            question: "¿Quién es el creador de Mickey Mouse?",
            options: ["Stan Lee", "Walt Disney", "Matt Groening", "Hanna-Barbera"],
            correct: 1
        },
        {
            question: "¿Cuál de estas es una película de Pixar?",
            options: ["Shrek", "Toy Story", "Madagascar", "Kung Fu Panda"],
            correct: 1
        }
    ]
};

// ===============================
// 3. ELEMENTOS DEL DOM
// ===============================
const questionText = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option");
const scoreText = document.getElementById("score");

const timeText = document.getElementById("timeText");
const timerCircle = document.getElementById("timer");

let currentIndex = 0;
let score = 0;
let time = 15;
let timer;

// ===============================
// 4. INICIAR JUEGO CON CATEGORÍA
// ===============================
let currentQuestions = questions[category];

if (!currentQuestions) {
    alert("No existen preguntas para esta categoría.");
}

// ===============================
// 5. MOSTRAR PREGUNTA
// ===============================
function loadQuestion() {
    const q = currentQuestions[currentIndex];

    questionText.textContent = q.question;

    optionButtons.forEach((btn, i) => {
        btn.textContent = q.options[i];
        btn.classList.remove("correct", "incorrect");
        btn.disabled = false;
    });

    resetTimer();
}

// ===============================
// 6. TEMPORIZADOR
// ===============================
function resetTimer() {
    clearInterval(timer);
    time = 15;
    timeText.textContent = time;

    timerCircle.style.strokeDashoffset = 0;

    timer = setInterval(() => {
        time--;
        timeText.textContent = time;

        timerCircle.style.strokeDashoffset = (15 - time) * (251 / 15);

        if (time <= 0) {
            clearInterval(timer);
            showIncorrect();
        }
    }, 1000);
}

// ===============================
// 7. CUANDO EL JUGADOR SELECCIONA
// ===============================
optionButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        clearInterval(timer);

        const correctIndex = currentQuestions[currentIndex].correct;

        if (index === correctIndex) {
            btn.classList.add("correct");
            score += 10;
            scoreText.textContent = score;
        } else {
            btn.classList.add("incorrect");
        }

        optionButtons.forEach(b => b.disabled = true);

        setTimeout(nextQuestion, 1000);
    });
});

// ===============================
// 8. CUANDO SE ACABA EL TIEMPO
// ===============================
function showIncorrect() {
    const correctIndex = currentQuestions[currentIndex].correct;
    optionButtons[correctIndex].classList.add("correct");
    optionButtons.forEach(b => b.disabled = true);
    setTimeout(nextQuestion, 1000);
}

// ===============================
// 9. SIGUIENTE PREGUNTA
// ===============================
function nextQuestion() {
    currentIndex++;

    if (currentIndex >= currentQuestions.length) {
        endGame();
    } else {
        loadQuestion();
    }
}

// ===============================
// 10. FIN DEL JUEGO
// ===============================
function endGame() {
    window.location.href = `result.html?score=${score}`;
}

// ===============================
// 11. INICIAR
// ===============================
loadQuestion();
