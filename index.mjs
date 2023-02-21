

export const handler = async(event,context) => {
    //INTITIALIZE 8X8 ARRAY
    var count = 1;
    var chessBoard =[];

    for (var i=0;i<8;i++)
    {
    var row = [];
    for (var j=0;j<8;j++)
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

        while (!placed && row <8){
            console.log(chessBoard[column][row]);
            if (chessBoard[column][row] == 0){
                chessBoard[column][row] = 1;
                placed = true;
                console.log('placed row ' + row+' column ' + column);
                markQueensShadow(column,row,1);
                let lastPlacedColumn = column;
                row++;
                column = 0;
            } else {
                if (column ==7){
                    row--;
                    chessBoard[lastPlacedColumn][row] = 0;
                    markQueensShadow (lastPlacedColumn,row,-1)
                    column = 0;

                } else {
                    column++;
                }
            }

        }
        placed = false;
        if (row == 7){solved = true};

    }
   
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;



function markQueensShadow(column,row,counter){
    for (i=0;i<7;i++){
        chessBoard[i][row]+=counter;
        console.log ("shadow @" + column + row);
     }
     for (i=0;i<7;i++){
        chessBoard[column][i] +=counter;
        console.log ("shadow @" + column + row);
     }

};


};
