const scoreTable = document.querySelector('#score-table');

function displayScores() {
    const scores = JSON.parse(localStorage.getItem('scores')) || [];

    scores.sort((a, b) => b.score - a.score); // Sort scores in descending order

    scoreTable.innerHTML = ''; // Clear the existing table

    for (let i = 0; i < scores.length; i++) {
        const row = document.createElement('tr');
        const playerNameCell = document.createElement('td');
        const playerScoreCell = document.createElement('td');

        playerNameCell.textContent = scores[i].name;
        playerScoreCell.textContent = scores[i].score;

        row.appendChild(playerNameCell);
        row.appendChild(playerScoreCell);
        scoreTable.appendChild(row);
    }
}

displayScores();
