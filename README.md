# TiTacToe

Turn based one player tic tac toe game with a built in artificial intelligence that plays ahead to find the best move to make after player makes a move

AI was built using the minimax algorithm.
Implementation for the minimax algorithm is as follows:
* Return a value if a terminal state is reached(-10,0,+10)
* Go through available spots on the board starting by taking turns
* If a board config represents a win for player than return -10
* If a board config represents a win for AI than return 10
* If a board config is full return 0 (tie)
* For each level of recursive calls return the lowest value up if the current turn is for player(minimize)
* For each level of recursive calls return the highest value up if the current turn is for AI(maximize)
* Minimize for player to indicate that if AI makes a certain move their is a chance that player can win
* Maximize for AI to indicate that a certain move makes sure that the AI wins.
