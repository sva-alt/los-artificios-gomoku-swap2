
class LosArtificios extends Agent{
  constructor(){ 
      super() 
      this.board = new Board()
  }
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

  value_position(board, piece){
    var open_mult = 1
    var opp_mult 
    var score = 1 
    var total_score = 0
    var k = 5
    var size = board.length
    for( var i=0; i<size; i++){
      for(var j=0; j<size; j++){
        var p = board[i][j]
        opp_mult = piece!=p ? -1:1
        if(p!=' '){
          if(j+k<=size && i+k<=size){  //ensure to not go out of bounds
            if (i>0 && j>0 && board[i-1][j-1] != ' ') open_mult = 0.25
            var c = 1
            for(var h=1;h<k; h++){
              if(board[i+h][j+h]==p){ 
              c++
              score *= 1.5 + 50
              } else break;            
            }
            if(c == k) return Infinity * opp_mult
            if (j<board.length && j<board.length && board[i][j+c] != ' ') open_mult = 0.25 //is open or not?
            total_score += score * open_mult * opp_mult
            open_mult = 1
          }
          if(j+1>=k && i+k<=size){                        
            if (i>0 && j<board.length && board[i-1][j+1] != ' ') open_mult = 0.25
            var c = 1
            for(var h=1;h<k; h++){
              if(board[i+h][j-h]==p){ 
              c++
              score *= 1.5 + 50
              } else break;
            }
            if(c == k) return Infinity * opp_mult
            if (i<board.length && j>0 && board[i][j+c] != ' ') open_mult = 0.25 //is open or not?
            total_score += score * open_mult * opp_mult
            open_mult = 1

          }
          if(j+k<=size){                        
            if (j>0 && board[i][j-1] != ' ') open_mult = 0.25
            var c = 1
            for(var h=1;h<k; h++){
              if(board[i][j+h]==p){
              c++
              score *= 1.5 + 50
              } else break;
            }
            if(c == k) return Infinity * opp_mult
            if (j<board.length && board[i][j+c] != ' ') open_mult = 0.25 //is open or not?
            total_score += score * open_mult * opp_mult
            open_mult = 1

          }
          if(i+k<=size){
            if (i>0 && board[i-1][j] != ' ') open_mult = 0.25
            var c = 1
            for(var h=1;h<k; h++){
              if(board[i+h][j]==p){
              c++
              score *= 1.5 + 50
              }
              else break;
            }
            if(c == k) return Infinity * opp_mult
            if (i<board.length && board[i+c][j] != ' ') open_mult = 0.25 //is open or not?
            total_score += score * open_mult * opp_mult
            open_mult = 1
          }
        }
      }
    }      
    return total_score
  }

  compute(board, move_state, time){
    var moves = this.board.valid_moves(board)
    var reduced_moves = []
    var index1, index2, index3
    var r
    var min_rang = Math.ceil(board.length * 0.4)
    var max_rang = Math.floor(board.length * 0.6)
    var flag
      switch(move_state){
        case '1':
          reduced_moves = []
          for (var move of moves) {
            if(min_rang <= move[0] && max_rang >= move[0] && 
                  min_rang <= move[1] && max_rang >= move[1]){
              reduced_moves.push(move)
            }
          }
          index1 = Math.floor(reduced_moves.length * Math.random())
          index2 = index1 
          while(index1==index2){
            index2 = Math.floor(reduced_moves.length * Math.random())
          }
          index3 = index1
          while(index3==index1 || index3==index2){
            index3 = Math.floor(reduced_moves.length * Math.random())
          }

          return [reduced_moves[index1], reduced_moves[index2], reduced_moves[index3]]
        break;
        case '2':
          reduced_moves = []
          for (var move of moves) {
            if(min_rang <= move[0] && max_rang >= move[0] && 
                  min_rang <= move[1] && max_rang >= move[1]){
              reduced_moves.push(move)
            }
          }
          r = Math.random()
          if(r<0.9999933333) return 'BLACK'
          if(r<0.66666){
            index1 = Math.floor(reduced_moves.length * Math.random())
            return reduced_moves[index1]
          }
          index1 = Math.floor(reduced_moves.length * Math.random())
          index2 = index1 
          while(index1==index2){
            index2 = Math.floor(reduced_moves.length * Math.random())
          }
          return [reduced_moves[index1], reduced_moves[index2]]
        break;
        case '3':
          reduced_moves = []
          for (var move of moves) {
            if(min_rang <= move[0] && max_rang >= move[0] && 
                  min_rang <= move[1] && max_rang >= move[1]){
              reduced_moves.push(move)
            }
          }
          r = Math.random()
          if(r<0.0000005) return 'BLACK'
          index1 = Math.floor(reduced_moves.length * Math.random())
          return reduced_moves[index1]
        break;
        default:
          index1 = Math.floor(moves.length * Math.random())
          var score = this.value_position(board, true)
          console.log(score)
          console.log(move_state)
          return moves[index1]

        break;
      }
    }
}
