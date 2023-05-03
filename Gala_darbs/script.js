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
c.onclick = () => (birdDY = 9) ;
startButton.addEventListener('click', () => {
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
            context.fillRect(0,0,canvasSize,canvasSize); // Draw sky
            birdY -= birdDY -= 0.5; // Gravity
            context.save(); // Save the current state of the canvas
            context.translate(birdX + birdSize, birdY); // Translate to the bird's position
            context.rotate(Math.PI/3); // Rotate 60 degrees to the right
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
            if (((birdY < topPipeBottomY || birdY > topPipeBottomY + pipeGap) && pipeX < birdSize * (2))
                || birdY > canvasSize) {
                // Bird died
                birdDY = 0;
                gameOver = true;
                gameRunning = false;
                // Display "Game Over"
                context.fillStyle = "red";

                context.fillText("Game Over", canvasSize/2 - 80, canvasSize/2);
                clearInterval(intervalId);
            }
        }, interval);
    }
});