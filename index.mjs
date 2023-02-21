

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

    }
    for (row=0;row<8;row++){
        for (column=0;column<8;column++){
            

        }


    }

    
   


    
  
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;



function place(){};

function markQueensShadow(){};




};
