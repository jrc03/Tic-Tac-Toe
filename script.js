// Player constructor
function Player(name, marker, color) {
    this.name = name;
    this.marker = marker;
    this.color = color;
}

// Players array
const players = [
    new Player("Player 1", "X", "red"),
    new Player("Player 2", "O", "blue")
];

// DOM Elements
const startBtn = document.querySelector("#startBtn");
const board = document.querySelector("#board");
const playerDiv = document.querySelector(".currentPlayer");
const changeNames = document.querySelector("#editBtn");
const dialog = document.querySelector("dialog");
const closeDialog = document.querySelector("#cancelBtn");
const resetCont = document.querySelector("#resetCont");

// Show and close the dialog
changeNames.addEventListener('click', () => dialog.showModal());
closeDialog.addEventListener('click', () => dialog.close());

let turn = 0; // Initialize turn variable
let gameboard = new Array(9).fill("");

// Function to manage turns
const turns = () => {
    const currentPlayer = players[turn];
    turn = (turn + 1) % players.length; // Cycle through players
    return currentPlayer;
};

// Function to display the game board
const displayBoard = () => {
    const cellWrap = document.createElement('div');
    cellWrap.classList.add('cellWrap'); // Add a class for styling

    gameboard.forEach((item, index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.textContent = item;
        cell.id = index;

        // Add click event to each cell
        cell.addEventListener('click', () => handleCellClick(cell, index));

        cellWrap.append(cell); // Append each cell to the cellWrap
    });

    board.append(cellWrap); // Append the cellWrap to the board
};

// Function to handle cell click events
const handleCellClick = (cell, index) => {
    if (gameboard[index] === "") { // Check if the cell is empty
        const currentPlayer = turns(); // Get the current player
        gameboard[index] = currentPlayer.marker; // Update the gameboard array
        cell.textContent = currentPlayer.marker; // Update the cell display
        cell.style.color = currentPlayer.color;

        updateCurrentPlayerDisplay(currentPlayer);

        if (checkWin()) {
            showWinnerDialog(currentPlayer);
        }
    }
};

// Function to update the current player display
const updateCurrentPlayerDisplay = (currentPlayer) => {
    playerDiv.textContent = ''; // Clear the previous player name
    const playerP = document.createElement('p');
    playerP.classList.add('playerName');
    playerP.style.color = currentPlayer.color;
    playerP.textContent = currentPlayer.name;
    playerDiv.append(playerP);
};

// Function to check for a winner
const checkWin = () => {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        if (gameboard[a] === gameboard[b] && gameboard[b] === gameboard[c] && gameboard[a] !== "") {
            return true;
        }
    }
    return false;
};

// Function to show the winner dialog
const showWinnerDialog = (currentPlayer) => {
    const winner = document.querySelector("#winnerName");
    winner.textContent = `${currentPlayer.name} wins!`;

    const winnerDialog = document.querySelector(".winner");
    winnerDialog.showModal();

    const closeWinnerDialog = document.querySelector(".closeWinnerDialog");
    closeWinnerDialog.addEventListener('click', () => {
        winnerDialog.close();
        resetGame();
    });
};

// Function to reset the game
const resetGame = () => {
    turn = 0; // Reset the turn counter
    gameboard.fill(""); // Reset the gameboard array
    board.textContent = ""; // Clear the board
    displayBoard(); // Display the updated gameboard
};

// Function to initialize the game
const initGame = () => {
    resetCont.addEventListener('click', resetGame);
    displayBoard();

    // Create and append the reset button
    const resetBtn = document.createElement('input');
    resetBtn.classList.add('buttons');
    resetBtn.type = 'button';
    resetBtn.value = 'Reset';
    resetBtn.id = 'resetBtn';
    resetCont.append(resetBtn);
};

// Start the game when the button is clicked
startBtn.addEventListener('click', initGame);
