
let targetNumber;
let lives;
const maxLives = 5;


function resetGame() {
    
    targetNumber = Math.floor(Math.random() * 20) + 1;
    lives = maxLives;
    
    
    updateLives();
    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    
    console.log('Target number:', targetNumber); 
}


function updateLives() {
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('lives').textContent = heartsDisplay;
}


function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const messageElement = document.getElementById('message');

    
    if (isNaN(guess) || guess < 1 || guess > 20) {
        messageElement.textContent = 'Please enter a number between 1 and 20';
        return;
    }

    
    if (guess === targetNumber) {
        messageElement.textContent = '🎉 Congratulations! You won!';
        messageElement.className = 'win';
        guessInput.disabled = true;
        return;
    }

    
    lives--;
    updateLives();
    
    
    const hint = guess < targetNumber ? 'higher' : 'lower';
    messageElement.textContent = `Try a ${hint} number!`;

    
    if (lives === 0) {
        messageElement.textContent = `😞 Game Over! The number was ${targetNumber}`;
        messageElement.className = 'lose';
        guessInput.disabled = true;
    }
}


resetGame();

    
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});