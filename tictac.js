const btns = document.querySelectorAll('.btn');
const messageElement = document.getElementById('message');
const resetButton = document.getElementById('reset');
let cover = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handlebtnClick = (event) => {
    const clickedbtn = event.target;
    const clickedbtnIndex = parseInt(clickedbtn.getAttribute('data-index'));

    if (cover[clickedbtnIndex] !== '' || !gameActive) {
        return;
    }

    cover[clickedbtnIndex] = currentPlayer;
    clickedbtn.textContent = currentPlayer;

    if (checkWin()) {
        messageElement.textContent = `Hurray! Player ${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (cover.includes('')) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        messageElement.textContent = `It's ${currentPlayer}'s turn`;
    } else {
        messageElement.textContent = `OOPS! It's a tie!`;
        gameActive = false;
    }
};

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (cover[a] && cover[a] === cover[b] && cover[a] === cover[c]) {
            btns[a].classList.add('winner');
            btns[b].classList.add('winner');
            btns[c].classList.add('winner');
            return true;
        }
    }
    return false;
};

const resetGame = () => {
    cover = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    messageElement.textContent = `It's ${currentPlayer}'s turn`;
    btns.forEach(btn => {
        btn.textContent = '';
        btn.classList.remove('winner');
    });
};

btns.forEach(btn => btn.addEventListener('click', handlebtnClick));
resetButton.addEventListener('click', resetGame);

messageElement.textContent = `It's ${currentPlayer}'s turn`;
