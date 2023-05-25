const registrationForm = document.getElementById('registration-form');
const usernameInput = document.getElementById('username-input');
const profileUsername = document.getElementById('profile-username');
const profileScore = document.getElementById('profile-score');
const topScoresTable = document.getElementById('top-scores');

let username = '';

registrationForm.addEventListener('submit', (event) => {
    event.preventDefault();
    username = usernameInput.value;
    profileUsername.textContent = `Username: ${username}`;
    registrationForm.reset();
});


let intervalId;
const startButton = document.querySelector('#start-button');

const context = c.getContext("2d");
const bird = new Image();
bird.src = "images/bird.png";
birdX = birdDY = score = bestScore = 0;
interval = birdSize = pipeWidth = topPipeBottomY = 24;
birdSize = 40;
birdY = pipeGap = 200;
canvasSize = pipeX = 400;
let gameRunning = false;
let gameOver = false;
c.onclick = () => (birdDY = 9);


function saveScoreToDatabase() {
    // Send an AJAX request to save the score to the database
    // Replace the URL with the endpoint to save the score
    const url = 'save_score.php';

    // Replace the method and headers as per your server-side implementation
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            score: score,
        }),
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response if needed
            console.log(data);
        })
        .catch(error => {
            // Handle the error if needed
            console.error(error);
        });
}
startButton.addEventListener('click', () => {
    if (!username) {
        alert('Please register a username first.');
        return;
    }

    if (gameOver) {
        gameOver = false;
        birdDY = 9;
        birdY = pipeGap = 200;
        pipeX = canvasSize;
        score = 0;
        bestScore = Math.max(score, bestScore);
    }
    if (!gameRunning) {
        gameRunning = true;
        intervalId = setInterval(() => {
            context.fillStyle = "skyblue";
            context.font = "bold 32px Arial";
            context.fillRect(0, 0, canvasSize, canvasSize); // Draw sky
            birdY -= birdDY -= 0.5; // Gravity
            context.save(); // Save the current state of the canvas
            context.translate(birdX + birdSize, birdY); // Translate to the bird's position
            context.rotate(Math.PI / 3); // Rotate 60 degrees to the right
            context.drawImage(bird, -birdSize, -birdSize, birdSize * 2, birdSize * 2); // Draw bird
            context.restore(); // Restore the saved state of the canvas
            context.fillStyle = "green";
            pipeX -= 8; // Move pipe
            pipeX < -pipeWidth && // Pipe off screen?
            ((pipeX = canvasSize), (topPipeBottomY = pipeGap * Math.random())); // Reset pipe and randomize gap.
            context.fillRect(pipeX, 0, pipeWidth, topPipeBottomY); // Draw top pipe
            context.fillRect(pipeX, topPipeBottomY + pipeGap, pipeWidth, canvasSize); // Draw bottom pipe
            context.fillStyle = "black";
            context.fillText(score++, 9, 25); // Increase and draw score
            bestScore = Math.max(score, bestScore); // New best score?
            context.fillText(`Best: ${bestScore}`, 9, 50); // Draw best score
            if (((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < birdSize * 2)
                || birdY > canvasSize) {
                // Bird died
                birdDY = 0;
                gameOver = true;
                gameRunning = false;
                // Display "Game Over"
                context.fillStyle = "red";
                context.fillText("Game Over", canvasSize / 2 - 80, canvasSize / 2);
                saveScoreToDatabase(); // Save the score to the database
                clearInterval(intervalId);
            }
        }, interval);
    }
});


