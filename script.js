javascript
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("questionForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form));
      localStorage.setItem("userAnswers", JSON.stringify(data));
      window.location.href = "result.html";
});
}

  const guessForm = document.getElementById("guessForm");
  if (guessForm) {
    guessForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const guestData = Object.fromEntries(new FormData(guessForm));
      const correct = JSON.parse(localStorage.getItem("userAnswers"));
      let score = 0;
      for (let i = 1; i <= 5; i++) {
        if (guestData[⁠ q${i} ⁠].toLowerCase() === correct[⁠ q${i} ⁠].toLowerCase()) {
          score++;
}
}
      const scoreboard = JSON.parse(localStorage.getItem("scoreboard") || "[]");
      scoreboard.push({ name: guestData.guestName, score});
      localStorage.setItem("scoreboard", JSON.stringify(scoreboard));
      window.location.href = "scoreboard.html";
});
}

  if (window.location.pathname.includes("scoreboard.html")) {
    document.getElementById("hostName").textContent = localStorage.getItem("username");
    const scores = JSON.parse(localStorage.getItem("scoreboard") || "[]");
    const table = document.getElementById("scoreTable");
    scores.forEach(entry => {
      const row = document.createElement("tr");
      row.innerHTML = ⁠ <td>${entry.name}</td><td>${entry.score}/5</td> ⁠;
      table.appendChild(row);
});
}
});