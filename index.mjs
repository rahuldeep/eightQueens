

export const handler = async(event,context) => {
    let boardSize = 3;
    //INTITIALIZE 8X8 ARRAY
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
    
    let solved = false;
    let placed = false;
    var column = 0;
    var row = 0;
    
    while (!solved){

        while (!placed){
            if (chessBoard[column][row] == 0){
                chessBoard[column][row] = 1;
                placed = true;
                console.log('placed row ' + row+' column ' + column);
                markQueensShadow(column,row,1);
                let lastPlacedColumn = column;
                row++;
                column = 0;
            } else {
                if (column ==boardSize-1){
                    row--;
                    chessBoard[lastPlacedColumn][row] = 0;
                    markQueensShadow (lastPlacedColumn,row,-1)
                    column = lastPlacedColumn+1;

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
        chessBoard[i][row]+=counter;
        console.log ("shadow @" + column + row);
     }
     chessBoard[column][row]-=2*counter;
     for (i=0;i<boardSize;i++){
        chessBoard[column][i] +=counter;
        console.log ("shadow @" + column + row);
        let leftOffset = i-row;
        let rightOffset = row-i;
        let leftOffsetColumn = column+leftOffset;
        let rightOffsetColumn = column+rightOffset;
        if (leftOffsetColumn<0 && leftOffsetColumn>boardSize-1){
            chessBoard[leftOffsetColumn][i] += counter; 
            console.log ("shadow @" + leftOffsetColumn + i); 
        }
        if (rightOffsetColumn<0 && rightOffsetColumn>boardSize-1){
            chessBoard[rightOffsetColumn][i] += counter;  
            console.log ("shadow @" + rightOffsetColumn + i); 
        }
     }
     chessBoard[column][row]-=2*counter;
     
     }

};


