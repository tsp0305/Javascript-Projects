const start_button = document.getElementById("start-button");
const question = document.getElementById("question");
const question_numebr = document.getElementById("current-question");
const total_question = document.getElementById("Total-question");
const screen = document.getElementById("quiz-screen");
const current_score = document.getElementById("score");
const option = document.getElementById("answer-content");
const progress_bar = document.getElementById("progress");
const last_screen = document.getElementById("result-screen");
const final_score = document.getElementById("final-score");
const restart_button = document.getElementById("restart-button");
const result_msg = document.getElementById("result-msg");
const total_score = document.getElementById("Total-score");
const start_screen = document.getElementById("start-screen");

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

let currentQuestionIndex = 0;
let score = 0;
let answerDisabled = false;
total_question.textContent = quizQuestions.length;
total_score.textContent = quizQuestions.length;

start_button.addEventListener("click",startQuiz);
restart_button.addEventListener("click",restartQuiz);

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    current_score.textContent = score;

    screen.classList.add("active");
    start_screen.classList.remove("active");
    show_question();

   
}

function show_question(){
     answerDisabled = false;
     const currentQuestion = quizQuestions[currentQuestionIndex];
     question.textContent = currentQuestion.question;
     question_numebr.textContent = currentQuestionIndex + 1;

    const progress_n = Math.floor((currentQuestionIndex / quizQuestions.length) * 100);
    progress_bar.style.width = `${progress_n}% `;

     
    option .innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer-btn");
        button.dataset.correct = answer.correct;
        button.addEventListener("click",selectAnswer);
        option.appendChild(button);
    });
         
};

function selectAnswer(e){
    if (answerDisabled) return;

    answerDisabled = true;
    const selectedButton = e.target;
    const iscorrect = selectedButton.dataset.correct === "true";
    
    Array.from(option.children).forEach((button) => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct");
      }
      else if(button === selectedButton){
        button.classList.add("incorrect");
      }
    });
    if (iscorrect){
      score++;
      current_score.textContent = score;

    }
  
    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < quizQuestions.length)
      {
        show_question();
      }
      else{
        show_results();
      }
    }
  ,1000)
}

function show_results(){
  screen.classList.remove("active");
  last_screen.classList.add("active");
  final_score.textContent = score;
  const percentage = (score/quizQuestions.length) * 100;
    if (percentage === 100) {
    result_msg.textContent = "Perfect! You're a genius!";
  } else if (percentage >= 80) {
    result_msg.textContent = "Great job! You know your stuff!";
  } else if (percentage >= 60) {
    result_msg.textContent = "Good effort! Keep learning!";
  } else if (percentage >= 40) {
    result_msg.textContent = "Not bad! Try again to improve!";
  } else {
    result_msg.textContent = "Keep studying! You'll get better!";
  }
}

function restartQuiz(){
    
    last_screen.classList.remove("active");
    start_screen.classList.add("active");
    
   
}

