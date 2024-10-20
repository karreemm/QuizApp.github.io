function validateUsername(username) {
  return !/\s|_/.test(username); 
}

function validatePassword(password) {
  return /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 8;
}

function login(event) {
  event.preventDefault(); 

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorElement = document.getElementById('login-error');

  const isUsernameValid = validateUsername(username);
  const isPasswordValid = validatePassword(password);

  console.log("Login attempt:", { username, password, isUsernameValid, isPasswordValid }); // Debug log

  if (isUsernameValid && isPasswordValid) {
    errorElement.classList.add('hidden');
    document.querySelector('.login-container').classList.add('hidden');
    document.getElementById('topic-selection').classList.remove('hidden');
  } else {
    console.log("Invalid credentials");
    errorElement.classList.remove('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  }
}

document.getElementById('login-button').addEventListener('click', login);

function startQuiz(topic) {
  sessionStorage.setItem('quizTopic', topic);
  window.location.href = "quiz.html"; 
}
