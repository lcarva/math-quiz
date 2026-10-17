(function () {
  const setupScreen = document.getElementById("setup-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const setupForm = document.getElementById("setup-form");
  const focusInput = document.getElementById("focus-input");
  const startInput = document.getElementById("start-input");
  const endInput = document.getElementById("end-input");
  const answerForm = document.getElementById("answer-form");
  const answerInput = document.getElementById("answer-input");
  const questionEl = document.getElementById("question");
  const scoreCountEl = document.getElementById("score-count");
  const changeRangeBtn = document.getElementById("change-range-btn");

  let focus = 0;
  let start = 1;
  let end = 12;
  let score = 0;
  let questionsIndex = 0;

  // List of questions with answers. Each item is an array with 3 items: a, b, answer.
  let questions = null;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function nextQuestion() {
    questionsIndex = (questionsIndex + 1) % questions.length;
    if (questionsIndex == 0) {
      shuffleArray(questions);
    }
    let a, b;
    [a, b, _] = questions[questionsIndex];

    questionEl.textContent = a + " x " + b;
    answerInput.value = "";
    answerInput.classList.remove("correct", "wrong");
    answerInput.focus();
  }

  setupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const fc = parseInt(focusInput.value, 10);
    const s = parseInt(startInput.value, 10);
    const en = parseInt(endInput.value, 10);
    focus = Number.isNaN(fc) ? 0 : fc;
    start = Number.isNaN(s) ? 1 : s;
    end = Number.isNaN(en) ? 12 : en;
    if (start > end) {
      [start, end] = [end, start];
    }
    questions = [];
    if (focus == 0) {
      for (let a = start; a <= end; a++) {
        for (let b = start; b <= end; b++) {
          questions.push([a, b, a * b]);
        }
      }
    } else {
      for (let _b = start; _b <= end; _b++) {
        questions.push([focus, _b, focus * _b]);
      }
    }
    // nextQuestion will increment to 0.
    questionsIndex = -1;
    score = 0;
    scoreCountEl.textContent = score;
    setupScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");
    nextQuestion();
  });

  answerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const guess = parseInt(answerInput.value, 10);
    const correct = questions[questionsIndex][2];
    if (guess === correct) {
      answerInput.classList.remove("wrong");
      answerInput.classList.add("correct");
      score += 1;
      scoreCountEl.textContent = score;
      nextQuestion();
    } else {
      answerInput.classList.remove("correct");
      answerInput.classList.add("wrong");
      answerInput.select();
    }
  });

  changeRangeBtn.addEventListener("click", () => {
    quizScreen.classList.add("hidden");
    setupScreen.classList.remove("hidden");
  });
})();
