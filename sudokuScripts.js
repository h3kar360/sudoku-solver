document.addEventListener('DOMContentLoaded', (e) => {
    const board = [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ];
    
    //initialise
    const boardElement = document.getElementById('container'); 
    const reset = document.getElementById('reset'); 
    const mistakesPH = document.getElementById('mistakes-counter');
    let valArray = [];   
    let mistakes = 0; 

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
                            mistakesPH.innerHTML = `Mistakes: ${mistakes}`;
                        }
                    });
                    cellDiv.appendChild(cellInput);                    
                }
                boardElement.appendChild(cellDiv);
            }        
       }
    } 
    
    const getBoardDataArray = () => {
        for (let i = 0; i < 9; i++) {
            valArray[i] = [];
            for (let j = 0; j < 9; j++) {
                const element = boardElement.children[i * 9 + j];
                valArray[i][j] = parseInt(element.textContent);
            }
        }
    }

    const updateBoardData = (row, cell, value) => {
        valArray[row][cell] = parseInt(value);
    }

    const sudokuRules = (row, cell) => {
        //check horizontal
        for (let j = 0; j < 9; j++) {
            if(j !== cell){
                if(valArray[row][cell] === valArray[row][j]){
                    return false;
                }
            }
        }

        //check vertical
        for (let i = 0; i < 9; i++) {
            if(i !== row){
                if(valArray[row][cell] === valArray[i][cell]){
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
                    if(valArray[i][j] === valArray[row][cell]){
                        return false;
                    }
                }
            }
        }

        return true;
    }
    
    
    //call
    createBoard();
    getBoardDataArray();

    //reset button
    reset.addEventListener('click', (e) => {
        boardElement.innerHTML = "";
        mistakes = 0;        
        mistakesPH.innerHTML = `Mistakes: 0`;
        createBoard();
        getBoardDataArray();
    });
    
});