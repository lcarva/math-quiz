const setupScreen = document.getElementById('setup-screen');
const quizScreen = document.getElementById('quiz-screen');
const setupForm = document.getElementById('setup-form');
const startInput = document.getElementById('start-input');
const endInput = document.getElementById('end-input');
const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const questionEl = document.getElementById('question');
const scoreCountEl = document.getElementById('score-count');
const changeRangeBtn = document.getElementById('change-range-btn');

let mode = 'from';
let start = 1;
let end = 12;
let a = 0;
let b = 0;
let score = 0;
let lastQuestionKey = '';

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function nextQuestion() {
  let key;
  if (mode == 'from') {
    do {
      a = randomBetween(start, end);
      b = randomBetween(start, end);
      key = a + ' x ' + b;
    } while (key === lastQuestionKey);
  } else {
    do {
      a = start;
      b = randomBetween(start, end);
      key = a + ' x ' + b;
    } while (key === lastQuestionKey);
  }
  lastQuestionKey = key;

  questionEl.textContent = key;
  answerInput.value = '';
  answerInput.classList.remove('correct', 'wrong');
  answerInput.focus();
}

setupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  mode = document.querySelector('input[name="mode"]:checked').value;
  const s = parseInt(startInput.value, 10);
  const en = parseInt(endInput.value, 10);
  start = Number.isNaN(s) ? 1 : s;
  end = Number.isNaN(en) ? 12 : en;
  if (start > end) {
    [start, end] = [end, start];
  }
  score = 0;
  scoreCountEl.textContent = score;
  lastQuestionKey = '';
  setupScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  nextQuestion();
});

answerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const guess = parseInt(answerInput.value, 10);
  const correct = a * b;

  if (guess === correct) {
    answerInput.classList.remove('wrong');
    answerInput.classList.add('correct');
    score += 1;
    scoreCountEl.textContent = score;
    nextQuestion();
  } else {
    answerInput.classList.remove('correct');
    answerInput.classList.add('wrong');
    answerInput.select();
  }
});

changeRangeBtn.addEventListener('click', () => {
  quizScreen.classList.add('hidden');
  setupScreen.classList.remove('hidden');
});
