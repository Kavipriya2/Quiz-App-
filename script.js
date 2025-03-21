// Quiz Data
const quizQuestions = [
    {
      id: 1,
      question: "What does 'DOM' stand for in JavaScript?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Document Oriented Module",
        "Digital Output Mechanism"
      ],
      correctAnswerIndex: 0
    },
    {
      id: 2,
      question: "Which of the following is NOT a JavaScript data type?",
      options: [
        "String",
        "Boolean",
        "Integer",
        "Symbol"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 3,
      question: "How can you add a comment in JavaScript?",
      options: [
        "// Comment",
        "<!-- Comment -->",
        "/* Comment */",
        "Both A and C"
      ],
      correctAnswerIndex: 3
    },
    {
      id: 4,
      question: "What will the following code return: typeof null",
      options: [
        "null",
        "undefined",
        "object",
        "number"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 5,
      question: "Which method is used to add an element at the end of an array?",
      options: [
        "push()",
        "append()",
        "add()",
        "insert()"
      ],
      correctAnswerIndex: 0
    },
    {
      id: 6,
      question: "What does the '===' operator do?",
      options: [
        "Assigns a value",
        "Compares values only",
        "Compares values and types",
        "Checks if a variable exists"
      ],
      correctAnswerIndex: 2
    },
    {
      id: 7,
      question: "Which function is used to parse a string to an integer?",
      options: [
        "Integer.parse()",
        "parseInt()",
        "parseInteger()",
        "int()"
      ],
      correctAnswerIndex: 1
    },
    {
      id: 8,
      question: "What is JavaScript's primary use on websites?",
      options: [
        "Styling elements",
        "Creating dynamic content",
        "Defining the structure",
        "Database management"
      ],
      correctAnswerIndex: 1
    }
  ];
  
  const WINNING_SCORE_THRESHOLD = 5;
  
  const resultMessages = {
    success: {
      title: "Congratulations!",
      message: "You've mastered JavaScript basics! Your coding journey is off to a great start!",
      imageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGdtcWZubXljMmpobzJzYmdqYXJ1OXljZHMxYW4wdmFydXR2M2VncyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dSeIWxDqf4TIoxDiP8/giphy.gif"
    },
    failure: {
      title: "Keep Practicing!",
      message: "JavaScript takes time to master. Review the concepts and try again!",
      imageUrl: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTJ1NjIzZHVwNnJxMGh3cWx2M2psaXRvczlrZTVxcm80cmkwbmI1ciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8L0Pky6C83SzkzU55a/giphy.gif"
    }
  };
  
  // DOM Elements
  const startScreen = document.getElementById('start-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const resultScreen = document.getElementById('result-screen');
  const startBtn = document.getElementById('start-btn');
  const restartBtn = document.getElementById('restart-btn');
  const questionNumber = document.getElementById('question-number');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const currentScore = document.getElementById('current-score');
  const totalQuestions = document.getElementById('total-questions');
  const progressBar = document.getElementById('progress-bar');
  const currentQuestionLabel = document.getElementById('current-question-label');
  const resultTitle = document.getElementById('result-title');
  const resultMessage = document.getElementById('result-message');
  const resultIcon = document.getElementById('result-icon');
  const resultImage = document.getElementById('result-image');
  const finalScore = document.getElementById('final-score');
  const finalTotal = document.getElementById('final-total');
  
  // Game State
  let score = 0;
  let currentQuestionIndex = 0;
  
  // Event Listeners
  document.addEventListener('DOMContentLoaded', init);
  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', restartQuiz);
  
  // Functions
  function init() {
    // Set up initial state
    totalQuestions.textContent = quizQuestions.length;
    finalTotal.textContent = quizQuestions.length;
  }
  
  function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    // Reset game state
    score = 0;
    currentQuestionIndex = 0;
    currentScore.textContent = score;
    
    // Load first question
    loadQuestion();
  }
  
  function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    
    // Update question info
    questionNumber.textContent = `Question ${question.id}`;
    questionText.textContent = question.question;
    currentQuestionLabel.textContent = `Question ${currentQuestionIndex + 1}`;
    
    // Update progress bar
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = `${progress}%`;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    
    // Add options
    question.options.forEach((option, index) => {
      const optionBtn = document.createElement('button');
      optionBtn.className = 'option-btn';
      optionBtn.innerHTML = option;
      optionBtn.addEventListener('click', () => selectAnswer(index));
      optionsContainer.appendChild(optionBtn);
    });
  }
  
  function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const isCorrect = selectedIndex === question.correctAnswerIndex;
    
    if (isCorrect) {
      score++;
      currentScore.textContent = score;
    }
    
    // Show visual feedback
    const options = document.querySelectorAll('.option-btn');
    
    options.forEach((option, index) => {
      option.disabled = true;
      
      if (index === question.correctAnswerIndex) {
        option.classList.add('correct');
        option.innerHTML += `<span class="option-indicator indicator-correct">✓</span>`;
      } else if (index === selectedIndex && !isCorrect) {
        option.classList.add('incorrect');
        option.innerHTML += `<span class="option-indicator indicator-incorrect">✗</span>`;
      } else {
        option.innerHTML += `<span class="option-indicator indicator-neutral"></span>`;
      }
    });
    
    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
      } else {
        showResult();
      }
    }, 1500);
  }
  
  function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    
    // Update result screen
    const isWinner = score >= WINNING_SCORE_THRESHOLD;
    const result = isWinner ? resultMessages.success : resultMessages.failure;
    
    resultTitle.textContent = result.title;
    resultMessage.textContent = result.message;
    resultImage.src = result.imageUrl;
    finalScore.textContent = score;
    
    // Set appropriate icon
    if (isWinner) {
      resultIcon.className = 'result-icon winner-icon';
      resultIcon.innerHTML = '🏆';
    } else {
      resultIcon.className = 'result-icon retry-icon';
      resultIcon.innerHTML = '↺';
    }
  }
  
  function restartQuiz() {
    resultScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
  }
  

function nextQuestion() {
    if (currQuestion < Questions.length - 1) {
        currQuestion++;
        loadQues();
    } else {
        loadScore();
    }
}