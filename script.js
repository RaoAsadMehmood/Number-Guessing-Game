// Initialize game variables
let targetNumber;
let lives;
const maxLives = 5;

// Function to start/reset the game
function resetGame() {
    // Generate random number between 1 and 20
    targetNumber = Math.floor(Math.random() * 20) + 1;
    lives = maxLives;
    
    // Reset UI elements
    updateLives();
    document.getElementById('message').textContent = '';
    document.getElementById('guess').value = '';
    document.getElementById('guess').disabled = false;
    
    console.log('Target number:', targetNumber); // For debugging
}

// Function to update lives display
function updateLives() {
    const heartsDisplay = '❤️'.repeat(lives);
    document.getElementById('lives').textContent = heartsDisplay;
}

// Function to handle player guesses
function checkGuess() {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);
    const messageElement = document.getElementById('message');

    // Validate input
    if (isNaN(guess) || guess < 1 || guess > 20) {
        messageElement.textContent = 'Please enter a number between 1 and 20';
        return;
    }

    // Check if guess is correct
    if (guess === targetNumber) {
        messageElement.textContent = '🎉 Congratulations! You won!';
        messageElement.className = 'win';
        guessInput.disabled = true;
        return;
    }

    // Wrong guess handling
    lives--;
    updateLives();
    
    // Provide hint
    const hint = guess < targetNumber ? 'higher' : 'lower';
    messageElement.textContent = `Try a ${hint} number!`;

    // Check for game over
    if (lives === 0) {
        messageElement.textContent = `😞 Game Over! The number was ${targetNumber}`;
        messageElement.className = 'lose';
        guessInput.disabled = true;
    }
}

// Initialize game on page load
resetGame();

// Add enter key support for submitting guess
document.getElementById('guess').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        checkGuess();
    }
});