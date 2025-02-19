class LosArtificios extends Agent {
    constructor() { 
        super();
        this.board = new Board();
        this.my_color // Inicializar el color del jugador
    }

    depth_factor(){

    }

    /**
     * Determines the movement to play
     * @param board A character matrix with the current board configuration
     * @param move_state A character indicating the movement to realize
     * @param time An array with the agent's remaining time
     */                              
    value_position(board, turn) {
        let open_mult = 1;
        let opp_mult;
        let score = 1;
        let total_score = 0;
        let k = 5; // Valor de la longitud para evaluar posibles líneas de 5
        let size = board.length;

        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                let p = board[i][j];
                opp_mult = turn != p ? -1 : 1;
                if (p != ' ') {
                    if (j + k <= size && i + k <= size) { // Asegurarse de no salir de los límites
                        if (i > 0 && j > 0 && board[i - 1][j - 1] != ' ') open_mult = 0.25;
                        let c = 1;
                        for (let h = 1; h < k; h++) {
                            if (board[i + h][j + h] == p) { 
                                c++;
                                score *= 1.5 + 50;
                            } else break;
                        }
                        if (c == k) return Infinity * opp_mult;
                        if (j < board.length && j < board.length && board[i][j + c] != ' ') open_mult = 0.25;
                        total_score += score * open_mult * opp_mult;
                        open_mult = 1;
                    }

                    if (j + 1 >= k && i + k <= size) {
                        if (i > 0 && j < board.length && board[i - 1][j + 1] != ' ') open_mult = 0.25;
                        let c = 1;
                        for (let h = 1; h < k; h++) {
                            if (board[i + h][j - h] == p) { 
                                c++;
                                score *= 1.5 + 50;
                            } else break;
                        }
                        if (c == k) return Infinity * opp_mult;
                        if (i < board.length && j > 0 && board[i][j + c] != ' ') open_mult = 0.25;
                        total_score += score * open_mult * opp_mult;
                        open_mult = 1;
                    }

                    if (j + k <= size) {
                        if (j > 0 && board[i][j - 1] != ' ') open_mult = 0.25;
                        let c = 1;
                        for (let h = 1; h < k; h++) {
                            if (board[i][j + h] == p) {
                                c++;
                                score *= 1.5 + 50;
                            } else break;
                        }
                        if (c == k) return Infinity * opp_mult;
                        if (j < board.length && board[i][j + c] != ' ') open_mult = 0.25;
                        total_score += score * open_mult * opp_mult;
                        open_mult = 1;
                    }

                    if (i + k <= size) {
                        if (i > 0 && board[i - 1][j] != ' ') open_mult = 0.25;
                        let c = 1;
                        for (let h = 1; h < k; h++) {
                            if (board[i + h][j] == p) {
                                c++;
                                score *= 1.5 + 50;
                            } else break;
                        }
                        if (c == k) return Infinity * opp_mult;
                        if (i < board.length && board[i + c][j] != ' ') open_mult = 0.25;
                        total_score += score * open_mult * opp_mult;
                        open_mult = 1;
                    }
                }
            }
        }
        return total_score;
    }

    simulate_move(board, move, color) {
        let newBoard = JSON.parse(JSON.stringify(board)); // Hacer una copia del tablero
        newBoard[move[0]][move[1]] = color; // Colocar la pieza en el tablero
        return newBoard;
    }

    minimax(board, depth, alpha, beta, isMaximizingPlayer) {
        if (depth === 0) {
            return this.value_position(board, this.my_color); // Evaluar la posición en la profundidad máxima
        }
        let min_rang = Math.ceil(board.length * 0.25)
        let max_rang = Math.floor(board.length * 0.75)
        let moves = this.board.valid_moves(board);
        let reduced_moves = []
        if(board.length > 9 ){
            for (let move of moves) {
                if(min_rang <= move[0] && max_rang >= move[0] && 
                    min_rang <= move[1] && max_rang >= move[1]){
                    reduced_moves.push(move)
                }            
            moves = reduced_moves
            }
        }
        if (isMaximizingPlayer) {
            let maxEval = -Infinity;
            for (let move of moves) {
                let newBoard = this.simulate_move(board, move, this.my_color);
                let evalu = this.minimax(newBoard, depth - 1, alpha, beta, false);
                maxEval = Math.max(maxEval, evalu);
                alpha = Math.max(alpha, evalu);
                if (beta <= alpha) break; // Poda
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let move of moves) {
                let newBoard = this.simulate_move(board, move, this.my_color === 'B' ? 'W' : 'B');
                let evalu = this.minimax(newBoard, depth - 1, alpha, beta, true);
                minEval = Math.min(minEval, evalu);
                beta = Math.min(beta, evalu);
                if (beta <= alpha) break; // Poda
            }
            return minEval;
        }
    }

    compute(board, move_state, time) {
        let moves = this.board.valid_moves(board);
        let bestMove = null;
        let bestValue = -Infinity;
        let alpha = -Infinity, beta = Infinity;
        let min_rang = Math.ceil(board.length * 0.4)
        let max_rang = Math.floor(board.length * 0.6)

        switch (move_state) {
            case '1': 
                // Lógica para el primer movimiento
                // Aquí es donde implementas la lógica para hacer las jugadas iniciales
                // Como ejemplo, si decides devolver tres movimientos
                return this.initial_move(moves, min_rang, max_rang);
            break;
            case '2':
                // Lógica para el segundo movimiento
                return this.second_move(moves, min_rang, max_rang);
            break;
            case '3':
                // Decide si juega con blancas o negras
                return this.third_move(moves, min_rang, max_rang);
            break;
            default:
                this.my_color = move_state
                // Cuando el agente tiene que jugar con un color específico
                let bestScore = -Infinity;

                for (let move of moves) {
                    let newBoard = this.simulate_move(board, move, this.my_color);
                    let score = this.minimax(newBoard, 1, alpha, beta, false); // Profundidad 3
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = move;
                    }
                }
                return bestMove;
        }
    }

    initial_move(moves, min_rang, max_rang) {
        // Lógica para el primer movimiento (e.g., colocar piezas negras y blancas)
        var index1
        var index2
        var index3
        var reduced_moves = []
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
        // Elegir 3 movimientos iniciales (dos negras y una blanca)
    }

    second_move(moves, min_rang, max_rang) {
        // Lógica para el segundo movimiento
        // Aquí se pueden colocar piezas de acuerdo con las reglas de Swap2
        var index1
        var index2
        var reduced_moves = []
        var r = Math.random()
        for (var move of moves) {
            if(min_rang <= move[0] && max_rang >= move[0] && 
                    min_rang <= move[1] && max_rang >= move[1]){
                reduced_moves.push(move)
            }
        }
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
    }

    third_move(moves, min_rang, max_rang){

        var index1
        var reduced_moves = []
        var r = Math.random()
        for (var move of moves) {
            if(min_rang <= move[0] && max_rang >= move[0] && 
                    min_rang <= move[1] && max_rang >= move[1]){
                reduced_moves.push(move)
            }
        }
        if(r<0.0000005) return 'BLACK'
        index1 = Math.floor(reduced_moves.length * Math.random())
        return reduced_moves[index1]
    }


    identify_player(board, move_state) {
        if (move_state === 'W') {
            this.my_color = 'W';
        } else if (move_state === 'B') {
            this.my_color = 'B';
        }

        let count = 0;
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] !== ' ') count++;
            }
        }

        // En Swap2, el jugador que eligió jugar como "Blancas" es el segundo jugador
        let first_player = this.my_color === 'B' ? 'W' : 'B';
        let current_turn = count % 2 === 0 ? first_player : (first_player === 'B' ? 'W' : 'B');

        return current_turn;
    }
}
