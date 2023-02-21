

export const handler = async(event,context) => {
    //variable for board size
    let boardSize = 3;
    //INTITIALIZE board ARRAY
    var count = 1;
    var chessBoard =[];

    for (var i=0;i<boardSize;i++)
    {
    var row = [];
    for (var j=0;j<boardSize;j++)
    {
        row.push(0);
        count++;
    }
    chessBoard.push(row);
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
                chessBoard[column][row] = 1;
                placed = true;
                console.log('placed row ' + row+' column ' + column);
                //mark all areas that are blocked because of 
                //the current placement
                markQueensShadow(column,row,1);
                let lastPlacedColumn = column;
                row++;
                column = 0;
            } else {
                //check to see if we have run out columns for the current row without
                //finding an open spot
                if (column ==boardSize-1){
                    //go back a row
                    row--;
                    //remove the last placed queen
                    chessBoard[lastPlacedColumn][row] = 0;
                    //unmark all areas that are now open
                    //
                    markQueensShadow (lastPlacedColumn,row,-1);
                    if (column < 7 ){column = lastPlacedColumn+1} else{column=0};

                } else {
                    column++;
                }
            }

        }
        placed = false;
        if (row == boardSize){solved = true};

    }
   
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;



function markQueensShadow(column,row,counter){
    
     for (i=0;i<boardSize;i++){
        chessBoard[column][i] +=counter;
        chessBoard[i][row]+=counter;
        //console.log ("shadow @" + column + i);
        let leftOffset = i-row;
        let rightOffset = row-i;
        let leftOffsetColumn = column+leftOffset;
        let rightOffsetColumn = column+rightOffset;
        if (leftOffsetColumn>0 && leftOffsetColumn<boardSize-1){
            chessBoard[leftOffsetColumn][i] += counter; 
            //console.log ("shadow @" + leftOffsetColumn + i); 
        }
        if (rightOffsetColumn>0 && rightOffsetColumn<boardSize-1){
            chessBoard[rightOffsetColumn][i] += counter;  
            //console.log ("shadow @" + rightOffsetColumn + i); 
        }
     }
     chessBoard[column][row]-=4*counter;
     console.log(chessBoard);
     
     }

};


