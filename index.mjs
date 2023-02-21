

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
    
   
    
    chessBoard [0],[1] = 1;
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;









};
