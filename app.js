const topics = {
    chemistry: [
      { question: "What is the chemical symbol for water?", answers: ["O2", "H2O", "CO2"], correct: 1, difficulty: 'easy' },
      { question: "What is the atomic number of Carbon?", answers: ["6", "12", "14"], correct: 0, difficulty: 'medium' },
      { question: "What is the pH of pure water?", answers: ["7", "1", "14"], correct: 0, difficulty: 'hard' },
      { question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Cu"], correct: 0, difficulty: 'easy' },
      { question: "What is the most abundant gas in the Earth's atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide"], correct: 1, difficulty: 'medium' },
      { question: "What is the chemical symbol for table salt?", answers: ["NaCl", "KCl", "HCl"], correct: 0, difficulty: 'hard' },
      { question: "What is the chemical symbol for iron?", answers: ["Fe", "Ir", "In"], correct: 0, difficulty: 'easy' },
      { question: "What is the chemical symbol for silver?", answers: ["Si", "Ag", "Au"], correct: 1, difficulty: 'medium' },
      { question: "What is the chemical symbol for lead?", answers: ["Ld", "Pb", "Le"], correct: 1, difficulty: 'hard' },
      { question: "What is the chemical symbol for mercury?", answers: ["Hg", "Me", "Hy"], correct: 0, difficulty: 'easy' },
      { question: "What is the chemical symbol for copper?", answers: ["Co", "Cu", "Cr"], correct: 1, difficulty: 'medium' },
      { question: "What is the chemical symbol for potassium?", answers: ["Po", "Pa", "K"], correct: 2, difficulty: 'hard' },
      { question: "What is the chemical symbol for sodium?", answers: ["So", "Sa", "Na"], correct: 2, difficulty: 'easy' },
      { question: "What is the chemical symbol for calcium?", answers: ["Ca", "Co", "Ce"], correct: 0, difficulty: 'medium' },
      { question: "What is the chemical symbol for magnesium?", answers: ["Mg", "Ma", "Me"], correct: 0, difficulty: 'hard' },
      { question: "What is the chemical symbol for zinc?", answers: ["Zn", "Zi", "Zc"], correct: 0, difficulty: 'easy' },
    ],
    physics: [
      { question: "What is the speed of light?", answers: ["300,000 km/s", "150,000 km/s", "600,000 km/s"], correct: 0, difficulty: 'easy' },
      { question: "What is Newton's second law?", answers: ["F=ma", "E=mc^2", "p=mv"], correct: 0, difficulty: 'medium' },
      { question: "What is the value of gravitational constant?", answers: ["9.8 m/s²", "6.67 × 10^-11 N(m/kg)²", "3.14"], correct: 1, difficulty: 'hard' },
      { question: "What is the boiling point of water in Fahrenheit?", answers: ["212°F", "100°F", "0°F"], correct: 0, difficulty: 'easy' },
      { question: "What is the unit of electric current?", answers: ["Ampere", "Coulomb", "Ohm"], correct: 0, difficulty: 'medium' },
      { question: "What is the unit of energy?", answers: ["Joule", "Watt", "Newton"], correct: 0, difficulty: 'hard' },
      { question: "What is the unit of power?", answers: ["Joule", "Watt", "Newton"], correct: 1, difficulty: 'easy' },
      { question: "What is the unit of resistance?", answers: ["Ampere", "Ohm", "Volt"], correct: 1, difficulty: 'medium' },
      { question: "What is the unit of charge?", answers: ["Ampere", "Coulomb", "Ohm"], correct: 1, difficulty: 'hard' },
      { question: "What is the unit of frequency?", answers: ["Hertz", "Watt", "Newton"], correct: 0, difficulty: 'easy' },
      { question: "What is the unit of force?", answers: ["Joule", "Watt", "Newton"], correct: 2, difficulty: 'medium' },
      { question: "What is the unit of voltage?", answers: ["Ampere", "Ohm", "Volt"], correct: 2, difficulty: 'easy' },
      { question: "What is the unit of work?", answers: ["Joule", "Watt", "Newton"], correct: 0, difficulty: 'medium' },
      { question: "What is the unit of magnetic field?", answers: ["Tesla", "Watt", "Newton"], correct: 0, difficulty: 'hard' },
      { question: "What is the unit of capacitance?", answers: ["Farad", "Watt", "Newton"], correct: 0, difficulty: 'easy' },
      { question: "What is the unit of inductance?", answers: ["Henry", "Watt", "Newton"], correct: 0, difficulty: 'medium' },
    ]
  };
  
  let score = 0;
  let currentQuestionIndex = 0;
  let totalQuestions = 10; 
  let timeRemaining = 60;
  let timerInterval;
  
  const questionElement = document.getElementById('question');
  const questionContainer = document.getElementById('question-container');
  const answersElement = document.getElementById('answers');
  const resultElement = document.getElementById('result');
  const scoreElement = document.getElementById('score');
  const timerElement = document.getElementById('timer');
  const restartButton = document.getElementById('restart');
  
  const shuffleArray = arr => arr.sort(() => Math.random() - 0.5);
  
  const loadSelectedTopic = () => {
    const topic = sessionStorage.getItem('quizTopic');
    if (topic && topics[topic]) {
      return shuffleArray(topics[topic]).slice(0, totalQuestions);
    }
    return [];
  };
  
  const displayQuestion = () => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    answersElement.innerHTML = '';
  
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.onclick = () => checkAnswer(index);
      answersElement.appendChild(button);
    });
  };
  
  const checkAnswer = index => {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    if (index === currentQuestion.correct) {
      score += currentQuestion.difficulty === 'easy' ? 1 : currentQuestion.difficulty === 'medium' ? 2 : 3;
      scoreElement.textContent = score;
    }
  
    currentQuestionIndex++;
    if (currentQuestionIndex < totalQuestions) {
      displayQuestion();
    } else {
      endQuiz();
    }
  };
  
  const startQuiz = () => {
    selectedQuestions = loadSelectedTopic();
    displayQuestion();
    
    timerInterval = setInterval(() => {
      timeRemaining--;
      timerElement.textContent = timeRemaining;
      
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  };
  
  const endQuiz = () => {
    clearInterval(timerInterval);
    questionElement.classList.add('hidden');
    answersElement.classList.remove('flex');
    answersElement.classList.add('hidden');
    questionContainer.classList.add('hidden');
    resultElement.classList.remove('hidden');
    
    let resultMessage;
    if (score <= 5) {
      resultMessage = `Bad! You scored ${score} points.`;
    } else if (score <= 10) {
      resultMessage = `Good! You scored ${score} points.`;
    } else {
      resultMessage = `Excellent! You scored ${score} points.`;
    }
    
    document.getElementById('result-message').textContent = resultMessage;
    scoreElement.textContent = score;
  };
  
  function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    timeRemaining = 60;
    scoreElement.textContent = score;
    timerElement.textContent = timeRemaining;
    resultElement.classList.add('hidden');
    answersElement.classList.remove('hidden');
    answersElement.classList.add('flex');
    questionElement.classList.remove('hidden');
    questionContainer.classList.remove('hidden');
    
    startQuiz();
  }
  
  function logout() {
    sessionStorage.removeItem('quizTopic'); 
    window.location.href = "index.html"; 
  }
  
  window.onload = () => {
    if (sessionStorage.getItem('quizTopic')) {
      startQuiz();
    }
  };
  