const words = ['BIRTHDAY', 'HAPPY', 'CELEBRATE', 'PARTY', 'CAKE', 'GIFTS', 'LOVE', 'FUN', 'SMILE', 'JOY'];
const gridSize = 10;
let board;
let selectedCells = [];

function startGame() {
    board = generateBoard();
    renderBoard();
    document.getElementById('message').textContent = '';
}

function generateBoard() {
    const board = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));
    words.forEach(word => {
        placeWord(board, word);
    });
    fillEmptySpaces(board);
    return board;
}

function placeWord(board, word) {
    let placed = false;
    while (!placed) {
        const direction = Math.random() > 0.5 ? 'horizontal' : 'vertical';
        const row = Math.floor(Math.random() * gridSize);
        const col = Math.floor(Math.random() * gridSize);
        if (canPlaceWord(board, word, row, col, direction)) {
            for (let i = 0; i < word.length; i++) {
                if (direction === 'horizontal') {
                    board[row][col + i] = word[i];
                } else {
                    board[row + i][col] = word[i];
                }
            }
            placed = true;
        }
    }
}

function canPlaceWord(board, word, row, col, direction) {
    if (direction === 'horizontal' && col + word.length > gridSize) return false;
    if (direction === 'vertical' && row + word.length > gridSize) return false;
    for (let i = 0; i < word.length; i++) {
        if (direction === 'horizontal' && board[row][col + i] !== '') return false;
        if (direction === 'vertical' && board[row + i][col] !== '') return false;
    }
    return true;
}

function fillEmptySpaces(board) {
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (board[row][col] === '') {
                board[row][col] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
            }
        }
    }
}

function renderBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.textContent = board[row][col];
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const cell = event.target;
    cell.classList.toggle('selected');
    const row = parseInt(cell.dataset.row, 10);
    const col = parseInt(cell.dataset.col, 10);
    const cellIndex = selectedCells.findIndex(c => c.row === row && c.col === col);
    if (cellIndex >= 0) {
        selectedCells.splice(cellIndex, 1);
    } else {
        selectedCells.push({ row, col });
    }
    checkWord();
}

function checkWord() {
    const selectedWord = selectedCells.map(cell => board[cell.row][cell.col]).join('');
    if (words.includes(selectedWord)) {
        document.getElementById('message').textContent = `You found a word: ${selectedWord}! Happy Birthday, Birthday Boy!`;
        selectedCells.forEach(cell => {
            const cellElement = document.querySelector(`.cell[data-row="${cell.row}"][data-col="${cell.col}"]`);
            cellElement.classList.add('found');
        });
        selectedCells = [];
    }
}

document.addEventListener('DOMContentLoaded', startGame);
