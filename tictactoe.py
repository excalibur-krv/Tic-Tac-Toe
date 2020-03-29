from random import randint
from sys import maxsize
from time import sleep

TOKENS = {
    "max": "X",
    "min": "O"
}


WIN_COMBINATIONS = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [6, 7, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6]
]


def print_board(board):
    state = "\n***********\n" \
            f"\n {board[0]} | {board[1]} | {board[2]} \n" \
            "-----------\n" \
            f" {board[3]} | {board[4]} | {board[5]} \n" \
            "-----------\n" \
            f" {board[6]} | {board[7]} | {board[8]} \n" \
            "\n***********\n"
    print(state)


def actions(board):
    for i, token in enumerate(board):
        if token != "X" and token != "O":
            yield i


def result(board, action, player_token):
    state = board.copy()
    state[action] = player_token
    return state


def terminal(board):
    for i, j, k in WIN_COMBINATIONS:
        if (board[i] == "X" and board[j] == "X" and board[k] == "X") \
            or (board[i] == "O" and board[j] == "O" and board[k] == "O"):
            return True
    
    count = 0

    for elem in board:
        if elem == "X" or elem == "O":
            count += 1
    
    if count == len(board):
        return True
    
    return False


def utility(board):
    for i, j, k in WIN_COMBINATIONS:
        token = TOKENS["max"]
        if (board[i] == token and board[j] == token and board[k] == token):
            return 1
        
        token = TOKENS["min"]
        if (board[i] == token and board[j] == token and board[k] == token):
            return -1

    return 0


def max_value(state, alpha, beta):
    if terminal(state):
        return utility(state)
    
    v = -maxsize
    token = TOKENS["max"]

    for action in actions(state):
        v = max(v, min_value(result(state, action, token), alpha, beta))
        if v >= beta:
            return v
        
        alpha = max(alpha, v)
    
    return v


def min_value(state, alpha, beta):
    if terminal(state):
        return utility(state)
    
    v = maxsize
    token = TOKENS["min"]
    for action in actions(state):
        v = min(v, max_value(result(state, action, token), alpha, beta))
        if v <= alpha:
            return v
        
        beta = min(beta, v)
    
    return v


def game():
    human_token = input("Enter your choice (X or O): ").strip().upper()

    if human_token != "X" and human_token != "O":
        raise ValueError(f"X or O was expected but received {human_token}")

    TOKENS["max"] = human_token
    TOKENS["min"] = ("O" if human_token == "X" else "X",)[0]

    print("Human choose", human_token, "Computer choose", TOKENS["min"])

    board = []
    for i in range(9):
        board.append(" ")
    
    print_board(board)

    turn = 1

    while not terminal(board):
        if turn is 1:
            available_choices = set(actions(board))
            while True:
                player_move = int(input("\nEnter a valid position between 1 and 9: \n").strip())
                if player_move - 1 not in available_choices:
                    print("Invalid position, try again")
                    continue
                else:
                    break
            
            board = result(board, player_move - 1, TOKENS["max"])
            turn = 0

        else:
            v = min_value(board.copy(), -maxsize, maxsize)
            token = TOKENS["min"]

            for action in actions(board):
                temp = result(board, action, token)
                cur = max_value(temp, -maxsize, maxsize)
                if cur == v:
                    break

            print("\nComputer Choose", action + 1, "\n")
            board = result(board, action, token)
            turn = 1

        print_board(board)

    winner = utility(board)

    if winner == 1:
        print("Human wins")
    elif winner == -1:
        print("Computer wins")
    else:
        print("Draw")

                

if __name__ == "__main__":
    game()