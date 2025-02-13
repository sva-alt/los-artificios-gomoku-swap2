class Human extends Agent{
    constructor(){ 
        super() 
        this.board = new Board()
    }


    compute(board, move_state, time){
    /**
     * Determines the movement to play
     *  param board A character matrix with the current board configuration
     *  param move_state A character indicating the movement to realize:
     *      '1' : Agent has to play the first move by placing two black and one white pieces. 
     *            Must return an array [[x1,y1], [x2,y2], [x3,y3]] with the positions of the 2 black pieces
     *            followed by the position of the white piece (in such order) 
     *      '2' : Agent has to play the second movement. It must be one of the following options
     *           (i) Play with black so must return a 'BLACK' message.
     *           (ii) Play one white piece and continue playing with white pieces. 
     *                Must return the position to play [x,y]
     *           (iii) Place two pieces one white and one black. Must return an array [[x1,y1], [x2,y2]]
     *                 with the positions of the white and black pieces (in such order) 
     *      '3' : Agent has to decide if play with whites or black pieces, If agent decides to play with 
     *            white must to play a white piece, i.e., must return a position [x,y] for placing that
     *            piece. If agent decides to play with black pieces must return a 'BLACK' message.
     *      'W' : The agent must play a white movement, i.e., must return a position [x,y] for a white piece.
     *            The first time recieving this message will indicate to the agent that its color is white for 
     *            the entire game.
     *      'B' : The agent must play a black movement, i.e., must return a position [x,y] for a black piece.
     *            The first time recieving this message will indicate to the agent that its color is black for 
     *            the entire game.
     *  param time An array with the agent's remaining time
     */                              
        let moves = []
        let rta = []
        let choose = ""
        let count = 0
        switch(move_state){
            case '1':
                moves = prompt("turn 1") // input should be 6 num, separated by spaces
                moves = moves.split(" ")
                rta = [[0,0],[0,0],[0,0]]
                count = 0
                for (let i = 0; i < rta.length; i++){
                    rta[i][0] = moves[count]
                    rta[i][1] = moves[count+1]
                    count += 2
                }
                return rta
            break;
            case '2':
                choose = prompt("1. play black \n 2. move white \n 3. Place two white and 1 white");
                switch(choose){
                    case '1':
                        return "BLACK"
                    break;
                    case '2':
                        moves = prompt("Play white")
                        return [moves.split(" ")[0], moves.split(" ")[1]]
                    break;
                    case '3':
                        moves = promt("Play white and black")// input should be 4 num, separated by spaces
                        moves = moves.split(" ")
                        rta = [[0,0], [0,0]] 
                        count = 0
                        for (let i = 0; i < rta.length; i++){
                            rta[i][0] = moves[count]
                            rta[i][1] = moves[count+1]
                            count += 2
                        }
                        return rta
                    break;
                }
                    
            break;
            case '3':
                choose = prompt("1. play white \n 2. play black")
                switch(choose){
                    case '1':
                        moves = prompt("Play white")
                        return [moves.split(" ")[0], moves.split(" ")[1]]
                    break;
                    case '2':
                        return "BLACK"
                    break;
                }
            break;
            default:
                moves = prompt("Play")
                return [moves.split(" ")[0], moves.split(" ")[1]]
            break;
        }
    }
}
