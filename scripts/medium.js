import { player1, player2, board } from "./app.js";
import { WIN_COMBINATIONS, checkOccupied } from "./utils.js";

let computerSelection;
let visited = [0, 0, 0, 0, 0, 0, 0, 0];
let flag = true;

function maximumUnoccupied(board, combinations, player1, player2) {
    let max = [];
    let maxCount = 0;
    let tempArr;
    for (let combination of combinations) {
        let temp = 0;
        tempArr = [];
        if (board[combination[0]].innerText.includes(player2) || !board[combination[0]].innerText.includes(player1)) {
            temp++;
            tempArr.push(combination[0]);
        }
        if (board[combination[1]].innerText.includes(player2) || !board[combination[1]].innerText.includes(player1)) {
            temp++;
            tempArr.push(combination[1]);
        }
        if (board[combination[2]].innerText.includes(player2) || !board[combination[2]].innerText.includes(player1)) {
            temp++;
            tempArr.push(combination[2]);
        }
        if (temp > maxCount) {
            maxCount = temp;
            max = tempArr.map(elem => elem);
        }
    }
    return max;
}

function updateVisited() {
    visited = visited.map((elem, index) => {
        if (checkOccupied(board[index], player1, player2)) {
            return 0;
        }
        return 1;
    });
    console.log(computerSelection, visited);
}

function computeMediumComputerMove() {
    if (typeof computerSelection == "undefined" || !computerSelection.length) {
        computerSelection = maximumUnoccupied(board, WIN_COMBINATIONS, player1, player2);
    }
    if (visited.every(elem => elem === 1)) {
        return;
    } else {
        if (!computerSelection.every(elem => !board[elem].innerText.includes(player1))) {
            computerSelection = maximumUnoccupied(board, WIN_COMBINATIONS, player1, player2);
            if (!computerSelection.every((elem) => visited[elem] === 1)) {
                updateVisited();
                return computeMediumComputerMove();
            } else {
                computerSelection = [];
                visited.forEach((elem, index) => {
                    if (!elem) {
                        computerSelection.push(index);
                    }
                })
                updateVisited();
                return computeMediumComputerMove();
            }
        } else {
            let index = computerSelection.pop();
            if (checkOccupied(board[index], player1, player2)) {
                updateVisited();
                board[index].innerText = player2;
            } else {
                updateVisited();
                computerSelection = [];
                visited.forEach((elem, index) => {
                    if (!elem) {
                        computerSelection.push(index);
                    }
                })
                return computeMediumComputerMove();
            }
        }
    }
}

export { computeMediumComputerMove, visited };