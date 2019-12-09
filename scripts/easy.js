import {
    board,
    player1,
    player2
} from "./app.js";
import { WIN_COMBINATIONS } from "./utils.js";

export function computeComputerMove() {
    let randomIndex = Math.floor(Math.random() * 9);
    const visited = [0, 0, 0, 0, 0, 0, 0, 0];
    visited[randomIndex] = 1;
    let count = 1;
    while (true) {
        if (checkOccupied(board[randomIndex], player1, player2)) {
            board[randomIndex].innerText = player2;
            break;
        } else {
            randomIndex = Math.floor(Math.random() * 9);
            if (visited[randomIndex] == 1) {
                continue;
            } else {
                count++;
                console.log(count);
            }
            visited[randomIndex] = 1;
            if (count == 9) {
                break;
            }
        }
    }
}

export function checkOccupied(elem, player1, player2) {
    return !elem.innerText.includes(player1) && !elem.innerText.includes(player2);
}

export function isWinner(board, WIN_COMBINATIONS, player1, player2) {
    for (let combination of WIN_COMBINATIONS) {
        try {
            if (board[combination[0]].innerText.includes(player1) &&
                board[combination[1]].innerText.includes(player1) &&
                board[combination[2]].innerText.includes(player1)) return { player1: true, player2: false };
            if (board[combination[0]].innerText.includes(player2) &&
                board[combination[1]].innerText.includes(player2) &&
                board[combination[2]].innerText.includes(player2)) return { player2: true, player1: false };

        } catch (e) {
            return { player1: false, player2: false };
        }
    }
    return { player1: false, player2: false };
}