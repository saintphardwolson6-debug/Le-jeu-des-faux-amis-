javascript
// Sauvegarde repons itilizatè a
let userAnswers = {};

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      formData.forEach((value, key) => {
        userAnswers[key] = value.trim();
});

      // Sauvegarde nan localStorage
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));

      // Redireksyon
      window.location.href = "result.html";
});
}

  // Si nou sou play.html, nou ka melanje repons yo
  if (window.location.pathname.includes("play.html")) {
    const storedAnswers = JSON.parse(localStorage.getItem("userAnswers")) || {};
    const fakeAnswers = generateFakeAnswers();
    const mixed = mixAnswers(Object.values(storedAnswers), fakeAnswers);
    displayQuiz(mixed);
}

  // Si nou sou scoreboard.html, nou ka montre klasman
  if (window.location.pathname.includes("scoreboard.html")) {
    loadScores();
}
});

// Fonksyon pou kreye repons fo
function generateFakeAnswers() {
  const fake = [
    "Sushi", "Rouge", "Chat", "Rap", "Basketball",
    "Thé", "Fast & Furious", "Hiver", "TikTok", "Lecture"
  ];
  return fake;
}

// Melanje repons vre ak fo
function mixAnswers(real, fake) {
  const all = [...real,...fake];
  return all.sort(() => Math.random() - 0.5);
}

// Afiche kesyon pou zanmi yo
function displayQuiz(answers) {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  answers.forEach((answer, index) => {
    const div = document.createElement("div");
    div.className = "answer-card";
    div.innerHTML = `
      <p>Choisis si cette réponse est vraie pour ton ami:</p>
      <strong>${answer}</strong><br/>
      <button onclick="validateAnswer('${answer}', true)">✅ Vrai</button>
      <button onclick="validateAnswer('${answer}', false)">❌ Faux</button>
    `;
    container.appendChild(div);
});
}

// Kalkile pwen
let score = 0;
function validateAnswer(answer, isTrue) {
  const realAnswers = Object.values(JSON.parse(localStorage.getItem("userAnswers")) || {});
  const isCorrect = realAnswers.includes(answer) === isTrue;
  if (isCorrect) score++;

  // Mete pwen nan localStorage
  localStorage.setItem("lastScore", score);
}

// Chaje klasman
function loadScores() {
  const table = document.getElementById("scoreTable");
  if (!table) return;

  const lastScore = localStorage.getItem("lastScore") || 0;
  const playerName = prompt("Ton prénom pour le classement:") || "Anonyme";

  const row = document.createElement("tr");
  row.innerHTML = `<td>${playerName}</td><td>${lastScore}/10</td>`;
  table.appendChild(row);
}
 ⁠