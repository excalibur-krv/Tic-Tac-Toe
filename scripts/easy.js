import {
    board,
    player1,
    player2
} from "./app.js";
import { WIN_COMBINATIONS, checkOccupied } from "./utils.js";

export function computeEasyComputerMove() {
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
            }
            visited[randomIndex] = 1;
            if (count == 9) {
                break;
            }
        }
    }
}