import { WIN_COMBINATIONS } from './utils.js';
import { player1, player2, board } from './app.js';

function actions(board) {
    const actions = [];

    for (let i = 0; i < board.length; i++) {
        if (!board[i].includes(player1) && !board[i].includes(player2)) {
            actions.push(i);
        }
    }

    return actions;
}

function result(board, action, player_token) {
    const state = board.slice();
    state[action] = player_token;
    return state;
}

function terminal(board) {
    for (let combination of WIN_COMBINATIONS) {
        let i = combination[0];
        let j = combination[1];
        let k = combination[2];

        if ((board[i].includes(player1) && board[j].includes(player1) && board[k].includes(player1)) ||
            (board[i].includes(player2) && board[j].includes(player2) && board[k].includes(player2))) {
            return true;
        }
    }

    let count = 0;

    for (let elem of board) {
        if (elem.includes(player1) || elem.includes(player2)) {
            count += 1;
        }
    }

    if (count === board.length) {
        return true;
    }
    return false;
}


function utility(board) {
    for (let combination of WIN_COMBINATIONS) {
        let i = combination[0];
        let j = combination[1];
        let k = combination[2];

        if (board[i].includes(player1) && board[j].includes(player1) && board[k].includes(player1)) {
            return 1;
        }

        if (board[i].includes(player2) && board[j].includes(player2) && board[k].includes(player2)) {
            return -1;
        }
    }

    return 0;
}


function max_value(state, alpha, beta) {
    if (terminal(state)) {
        return utility(state);
    }

    let v = -1000

    for (let action of actions(state)) {
        v = Math.max(v, min_value(result(state, action, player1), alpha, beta));

        if (v >= beta) {
            return v;
        }

        alpha = Math.max(alpha, v);
    }

    return v;
}


function min_value(state, alpha, beta) {
    if (terminal(state)) {
        return utility(state);
    }

    let v = 1000

    for (let action of actions(state)) {
        v = Math.min(v, max_value(result(state, action, player2), alpha, beta));

        if (v <= alpha) {
            return v;
        }

        beta = Math.min(beta, v);
    }

    return v;
}


function computeHardComputerMove() {
    const state = [];

    for (let elem of board) {
        state.push(elem.innerText);
    }

    console.log(state);
    let v = min_value(state.slice(), -1000, 1000);
    let choice = 0;

    for (let action of actions(state)) {
        const temp = result(state, action, player2);
        let cur = max_value(temp, -1000, 1000);
        console.log(cur);
        if (cur === v) {
            choice = action;
            break;
        }
    }

    console.log("chosen", choice);

    if (!board[choice].innerText.includes(player1) && !board[choice].innerText.includes(player2))
        board[choice].innerText = player2;
    else
        alert("Draw");
}

export { computeHardComputerMove };
