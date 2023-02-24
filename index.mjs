

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
                console.log(chessBoard);
                row++;
                column = 0;
                placed = true;
            } else {
                //check to see if we have run out columns for the current row without
                //finding an open spot
                while (column == boardSize-1){
                    //if you are at 1st row already, accept defeat
                    if (row==0) {
                        console.log("unsolvable!");
                        solved = true;
                    }
                    //go back 1 row and remove the piece there
                    row--;
                    console.log("solution before calling remove ", solution);
                    removePiece(row);
                    console.log(chessBoard);
                    //set current column to that row's solution
                    column = solution[row];
                    console.log("current row & column & solution row val " , row , column, solution[row]);
                    //remove it from solution
                     solution[row] = 0;
                }
                    column++;
                    console.log ("column incremented to", row,  column);
                
            }

        }
        placed = false;
        
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
     //add column number to solution array
    solution[row] = column;
    console.log('placed row ' + row+' column ' + column);
    console.log ('solution till now' + solution);
    //mark all areas that are blocked because of 
    //the current placement
    markQueensShadow(column,row,1);
    //lastPlacedColumn = column;
    
}

function removePiece(row){
    console.log("solution at the begining of function remove ", solution);
    let column = solution[row];
    //remove the last placed queen
    chessBoard[column][row] = 0;
    console.log('removed row ' + row +' column ' + column);
    console.log ('solution till now' + solution);
    //put the next column from the last placed as the active
    //column=lastPlacedColumn+1;
    //unmark all areas that are now open
    //
    markQueensShadow(column,row,-1);
    
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
        if (leftOffsetColumn>0 && leftOffsetColumn<boardSize && leftOffset !=0){
            chessBoard[leftOffsetColumn][i] += counter; 
            //console.log ("shadow @" + leftOffsetColumn + i); 
        }
        //mark right diagonal
        if (rightOffsetColumn>0 && rightOffsetColumn<boardSize && rightOffset !=0){
            chessBoard[rightOffsetColumn][i] += counter;  
            //console.log ("shadow @" + rightOffsetColumn + i); 
        }
     }
     //reset the currently placed cell because we would have
     // gone over if multiple times
     //if (counter=1) {chessBoard[column][row] = 1} else{chessBoard[column][row] = 0};
     
     
     }

};


