import { hideBoard } from "./app.js";

const WIN_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
];

function checkDraw(board, player1, player2) {
    return board.every(elem => elem.innerText.includes(player1) || elem.innerText.includes(player2));
}

function checkOccupied(elem, player1, player2) {
    return !elem.innerText.includes(player1) && !elem.innerText.includes(player2);
}

function isWinner(board, WIN_COMBINATIONS, player1, player2) {
    for (let combination of WIN_COMBINATIONS) {
        try {
            if (board[combination[0]].innerText.includes(player1) &&
                board[combination[1]].innerText.includes(player1) &&
                board[combination[2]].innerText.includes(player1)) return { winner: player1 };
            if (board[combination[0]].innerText.includes(player2) &&
                board[combination[1]].innerText.includes(player2) &&
                board[combination[2]].innerText.includes(player2)) return { winner: player2 };

        } catch (e) {
            return { winner: "" };
        }
    }
    return { winner: "" };
}

function findWinner(board, WIN_COMBINATIONS, player1, player2) {
    let { winner } = isWinner(board, WIN_COMBINATIONS, player1, player2);
    if (winner) {
        alert(`${winner} won the game`);
        hideBoard();
        return true;
    }
    return false;
}

export { WIN_COMBINATIONS, findWinner, isWinner, checkDraw, checkOccupied };