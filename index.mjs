

export const handler = async(event,context) => {
    //variable for board size
    let boardSize = 8;
    //INTITIALIZE board ARRAY
    var count = 1;
    var chessBoard =[];
    var solution =[];

    for (var i=0;i<boardSize;i++)
    {
        var chessRow = [];
        for (var j=0;j<boardSize;j++)
            {
                //fill with 0s
                chessRow.push(0);
            }
        chessBoard.push(chessRow);
        solution.push(0);
    }
    //set up variables to check progress and hold intermediary values
    let solved = false;
    let placed = false;
    var column = 0;
    var row = 0;
    let lastPlacedColumn = 0;
    
    while (!solved){

        while (!placed){
            //check to see if current position is open
            if (chessBoard[column][row] == 0){
                addPiece(column,row);
            } else {
                //check to see if we have run out columns for the current row without
                //finding an open spot
                if (column ==boardSize-1){
                    removePiece(column,row,lastPlacedColumn);
                    //set current column to last one + 1
                    //or call removePiece again for the last row
                    if (column < boardSize-1 ){column = lastPlacedColumn+1
                    } else{removePiece(column,row,solution[row-1])};

                } else {
                    column++;
                }
            }

        }
        placed = false;
        console.log(chessBoard);
        //if we have reached the last row, we are done
        if (row == boardSize){solved = true};


    }
   
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;


//adds a new queent o the board and marks all shadow cells    
function addPiece(column,row){
    chessBoard[column][row] = "X";
    placed = true;
    //add column number to solution array
    solution[row] = 1;
    console.log('placed row ' + row+' column ' + column);
    console.log ('solution till now' + solution);
    //mark all areas that are blocked because of 
    //the current placement
    markQueensShadow(column,row,1);
    lastPlacedColumn = column;
    row++;
    column = 0;
}

function removePiece(column,row,lastPlacedColumn){
    //go back a row
    row--;
    //remove the last placed queen
    chessBoard[lastPlacedColumn][row] = 0;
    //remove it from solution
    solution[row] = 0;
    console.log('removed row ' + row+' column ' + lastPlacedColumn);
    //put the next column from the last placed as the active
    //column=lastPlacedColumn+1;
    //unmark all areas that are now open
    //
    markQueensShadow (lastPlacedColumn,row,-1);
    
}

function markQueensShadow(column,row,counter){
    
     for (i=0;i<boardSize;i++){
        //mark the rows for that column
        if (i!= row){chessBoard[column][i] +=counter};
        //mark the columns for that row
        if (i!=column){chessBoard[i][row]+=counter};
        //console.log ("shadow @" + column + i);
        let leftOffset = i-row;
        let rightOffset = row-i;
        let leftOffsetColumn = column+leftOffset;
        let rightOffsetColumn = column+rightOffset;
        //mark left diagonal
        if (leftOffsetColumn>0 && leftOffsetColumn<boardSize){
            if (leftOffset!=0){chessBoard[leftOffsetColumn][i] += counter}; 
            //console.log ("shadow @" + leftOffsetColumn + i); 
        }
        //mark right diagonal
        if (rightOffsetColumn>0 && rightOffsetColumn<boardSize){
            if (rightOffset!=0){chessBoard[rightOffsetColumn][i] += counter};  
            //console.log ("shadow @" + rightOffsetColumn + i); 
        }
     }
     //reset the currently placed cell because we would have
     // gone over if multiple times
     //if (counter=1) {chessBoard[column][row] = 1} else{chessBoard[column][row] = 0};
     
     
     }

};


