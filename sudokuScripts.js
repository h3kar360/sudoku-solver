document.addEventListener('DOMContentLoaded', (e) => {
    const oriBoard = [[0, 0, 0, 0, 0, 0, 0, 1, 2],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 3, 5, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 7, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [9, 8, 0, 0, 0, 0, 0, 0, 0]];
    
    let board = [[0, 0, 0, 0, 0, 0, 0, 1, 2],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 3, 5, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 7, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [9, 8, 0, 0, 0, 0, 0, 0, 0]];

    //initialise
    const boardElement = document.getElementById('container');
    const reset = document.getElementById('reset');
    const mistakesPH = document.getElementById('mistakes-counter');
    const solve = document.getElementById('solve-btn');
    let mistakes = 0;

    //solver
    const solveSudoku = (row, cell) => {
        if(row === 9)
            return true;
        else if(cell === 9)
            return solveSudoku(row + 1, 0);
        else if(board[row][cell] !== 0)
            return solveSudoku(row, cell + 1);
        else{
            for (let i = 1; i < 10; i++) {
                board[row][cell] = i;
                const isValid = sudokuRules(row, cell);
                if(isValid && solveSudoku(row, cell + 1)){
                    return true;
                }

                board[row][cell] = 0;
            }
        }

        return false;
    }

    //functions
    const createBoard = () => {
       for (let row = 0; row < board.length; row++) {
            for (let cell = 0; cell < board[row].length; cell++) {
                const cellDiv = document.createElement('div');
                cellDiv.classList.add('cell-div');
                if(board[row][cell] !== 0){
                    cellDiv.textContent = board[row][cell];
                }
                else{
                    const cellInput = document.createElement('input');
                    cellInput.type = 'text';
                    cellInput.classList.add('cell-input');
                    cellInput.maxLength = 1;
                    cellInput.addEventListener('input', (e) => {
                        const val = e.target.value;
                        if(!/^[1-9]$/.test(val))
                            e.target.value = '';
                        updateBoardData(row, cell, val);
                        if(sudokuRules(row, cell) === false){
                            e.target.value = '';
                            mistakes++;
                            mistakesPH.innerText = `Mistakes: ${mistakes}`;
                        }
                    });
                    cellDiv.appendChild(cellInput);
                }
                boardElement.appendChild(cellDiv);
            }
       }
    }

    const updateBoardData = (row, cell, value) => {
        board[row][cell] = parseInt(value);
    }

    const sudokuRules = (row, cell) => {
        //check horizontal
        for (let j = 0; j < 9; j++) {
            if(j !== cell){
                if(board[row][cell] === board[row][j]){
                    return false;
                }
            }
        }

        //check vertical
        for (let i = 0; i < 9; i++) {
            if(i !== row){
                if(board[row][cell] === board[i][cell]){
                    return false;
                }
            }
        }

        //check 3x3
        const startRow = (row - (row % 3));
        const startCell = (cell - (cell % 3));

        for (let i = startRow; i < startRow + 3; i++) {
            for (let j = startCell; j < startCell + 3; j++) {
                if(i != row && j != cell){
                    if(board[i][j] === board[row][cell]){
                        return false;
                    }
                }
            }
        }

        return true;
    }


    //call
    createBoard();

    //reset button
    reset.addEventListener('click', (e) => {        
        board = oriBoard;        
        boardElement.textContent = ' ';
        mistakes = 0;
        mistakesPH.textContent = `Mistakes: 0`;
        createBoard();
    });

    //solve button
    solve.addEventListener('click', () => {
        solveSudoku(0, 0);
        boardElement.textContent = '';
        createBoard();
    });

});