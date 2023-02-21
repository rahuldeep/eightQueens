

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
    
    let solved = true;
    let placed = true;
    var column = 0;
    var row = 0;
    
    while (!solved && column < 8){

        while (!placed && row <8){
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


    }
    for (row=0;row<8;row++){
        for (column=0;column<8;column++){
            

        }


    }

    
   


    
    chessBoard [0][1] = 1;
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;



function place(){};

function markQueensShadow(){};




};
