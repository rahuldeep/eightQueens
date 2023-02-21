

export const handler = async(event,context) => {
    
    var count = 1;
    var chessBoard =[];

    for (var i=0;i<2;i++)
    {
    var row = [];
    for (var j=0;j<5;j++)
    {
        row.push("Test" + count);
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
