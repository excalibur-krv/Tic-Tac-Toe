import { WIN_COMBINATIONS, checkOccupied, checkDraw, findWinner } from "./utils.js";
import { computeMediumComputerMove, visited } from "./medium.js";
import { computeEasyComputerMove } from "./easy.js";

// Elements containing the game board, difficulty, player token options
const gameBoard = document.querySelector(".x_o_selector");
const board = [];

// Elements for handling diffilculty selection options before game starts
const easyDifficulty = document.createElement("div");
const mediumDifficulty = document.createElement("div");

// Elements placeholders for X and O selection options before game starts
const heading = document.createElement("h1");
const oSelector = document.querySelector(".o_selector");
const xSelector = document.querySelector(".x_selector");
const oSelectorBackFace = document.querySelector(".o_backface");
const xSelectorBackFace = document.querySelector(".x_backface");


heading.innerText = "Choose X or O";
heading.classList.add("x_o_title");
gameBoard.prepend(heading);

let player1 = null;
let player2 = null;
let computeComputerMove = null;
// Simulation of synchronous time delay function, needs to be executed with async await

function delay(ms) {
    return new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            resolve(id);
        }, ms);
    });
}

// Functions responsible for hiding and unhiding dom elements

function hideXOSelectors() {
    oSelector.remove()
    oSelectorBackFace.remove();
    xSelector.remove();
    xSelectorBackFace.remove();
    heading.innerText = "Choose Game Difficulty";

    easyDifficulty.innerText = "Easy";
    easyDifficulty.classList.add("x_selector", "difficulty_size");
    gameBoard.append(easyDifficulty);

    mediumDifficulty.innerText = "Medium";
    mediumDifficulty.classList.add("difficulty_size", "medium_size");
    gameBoard.append(mediumDifficulty);

    console.log(`player1 is ${player1}, player2 is ${player2}`);
}

function hideDifficultySelectors() {
    easyDifficulty.remove();
    mediumDifficulty.remove();
    heading.innerText = "Tic-Tac-Toe";
}

function hideBoard() {
    gameBoard.querySelectorAll(".row").forEach(elem => elem.remove());
    heading.innerText = "Choose X or O";
    gameBoard.append(xSelector, xSelectorBackFace, oSelector, oSelectorBackFace);
}

// Functions responsible for working with the game board

function createBoard() {
    for (let i = 0; i < 9; i++) {
        board.pop();
    }
    for (let i = 0; i < 9; i++) {
        board.push(document.createElement("div"));
        board[i].innerText = " ";
    }
    return board
}

function setUpStyles() {
    createBoard();
    let count = -1;
    board.forEach((elem, index) => {
        console.log(index);
        let temp = index % 3;
        if (!temp) {
            ++count;
        }
        elem.classList.add("board", `row${count}${temp}`);
    });
    return board;
}


function setUpBoardEventListeners() {
    for (let i = 0; i < 9; i++) {
        board[i].addEventListener("click", () => {
            let temp;
            if (checkOccupied(board[i], player1, player2)) {
                (async function eventDelay() {
                    let id = await delay(100);
                    clearInterval(id);
                    board[i].innerText = player1;
                    (async function winnerDelay() {
                        let id = await delay(300);
                        clearInterval(id);
                        temp = findWinner(board, WIN_COMBINATIONS, player1, player2);
                        if (temp) return;
                    })();
                    (async function eventDelay() {
                        let id = await delay(100);
                        clearInterval(id);
                        computeComputerMove();
                        (async function winnerDelay() {
                            let id = await delay(400);
                            clearInterval(id);
                            if (temp) return;
                            temp = findWinner(board, WIN_COMBINATIONS, player1, player2);
                            if (temp) return;
                        })();
                    })();
                })();
            } else {
                alert("Position is occupied");
            }
            if (checkDraw(board, player1, player2)) {
                alert("Draw");
                hideBoard();
            }
        });
    }
}

function beginGame() {
    setUpStyles();
    let row;
    let count = -1;
    board.forEach((elem, index) => {
        if (!(index % 3)) {
            if (count != -1)
                gameBoard.append(row);
            ++count;
            row = document.createElement("div");
            row.classList.add("row")
            row.append(elem);
        } else {
            row.append(elem);
        }
        if (index == 8)
            gameBoard.append(row);
    });
    setUpBoardEventListeners();

}

// O Token Selector event handlers

oSelector.addEventListener("mouseover", () => {
    oSelector.classList.toggle("flip");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        oSelector.classList.toggle("hide");
        oSelectorBackFace.classList.toggle("unhide");
    })();
});


oSelector.addEventListener("mouseout", () => {
    oSelector.classList.toggle("hide");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        oSelector.classList.toggle("flip")
        oSelectorBackFace.classList.toggle("unhide");
    })();
});

oSelector.addEventListener("click", () => {
    player1 = "O";
    player2 = "X";
    hideXOSelectors();
});

oSelectorBackFace.addEventListener("click", () => {
    player1 = "O";
    player2 = "X";
    hideXOSelectors();
});


// X Token Selector event handlers

xSelector.addEventListener("mouseover", () => {
    xSelector.classList.toggle("flip");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        xSelector.classList.toggle("hide");
        xSelectorBackFace.classList.toggle("unhide");
    })();
});

xSelector.addEventListener("mouseout", () => {
    xSelector.classList.toggle("hide");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        xSelector.classList.toggle("flip")
        xSelectorBackFace.classList.toggle("unhide");
    })();
});

xSelector.addEventListener("click", () => {
    player1 = "X";
    player2 = "O";
    hideXOSelectors();
});

xSelectorBackFace.addEventListener("click", () => {
    player1 = "X";
    player2 = "O";
    hideXOSelectors();
});

// Difficulty event handlers

easyDifficulty.addEventListener("click", () => {
    computeComputerMove = computeEasyComputerMove;
    hideDifficultySelectors();
    beginGame();
});

mediumDifficulty.addEventListener("click", () => {
    computeComputerMove = computeMediumComputerMove;
    visited.forEach((_, index) => visited[index] = 0);
    hideDifficultySelectors();
    beginGame();
});

export { board, player1, player2, hideBoard };