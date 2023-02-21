

export const handler = async(event,context) => {
    
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
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify(chessBoard),
    };
    return response;









};
