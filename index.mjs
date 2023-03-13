 //INTITIALIZE global board & soluton array
 let chessBoard =[];
 let solution =[];
 //global variable for board size
 const boardSize = 8;
export const handler = async(event,context) => {
   
    //inittialize board

    for (var i=0;i<boardSize;i++)
    {
        let chessRow = [];
        for (var j=0;j<boardSize;j++)
            {
                //fill with 0s
                chessRow.push(0);
            }
        chessBoard.push(chessRow);
        solution.push(0);
    }
    //set up variables to check progress and hold intermediary values
    let foundAllSoultions = false;
    let foundSolution = false;
    let placedQueen = false;
    let column = 0;
    let row = 0;
     //var for how many steps it took
    let steps=0;
    let solutionCount = 0;
        while (!foundAllSoultions){    
            while (!foundSolution){

                while (!placedQueen){
                    //check to see if current position is open
                    if (chessBoard[column][row] == 0){
                        addPiece(column,row);
                        steps++;
                        //console.log(chessBoard);
                        row++;
                        column = 0;
                        placedQueen = true;
                    } else {
                        //check to see if we have run out columns for the current row without
                        //finding an open spot
                        while (column == boardSize-1){
                            //if you are at 1st row already, accept defeat
                            if (row==0) {
                                console.log("unsolvable!");
                                foundAllSoultions = true;
                                foundSolution = true;
                                placedQueen = true;
                            } else {
                            
                            //go back one row and remove the piece
                            column = goBack(row);
                            row--;
                            steps++;
                            }
                        }
                            column++;
                            //console.log ("column incremented to", row,  column);
                        
                    }

                }
               
                

                 //if we have reached the last row and last column, we have found all solutions
                 if (row == boardSize && column ==boardSize){foundAllSoultions = true}
                    else {
                //if we have reached the last row only, we have found a solutions
                        if (row == boardSize){foundSolution = true};
                    }
                placedQueen = false;


            }
        
            solutionCount++;
            console.log (JSON.stringify(solution) + 'solution number' + solutionCount + ' in steps ' + steps);
            
            //set up for next solution
            foundSolution = false;
            //remove the last solution from the last row
            column = goBack(boardSize);
            //set row for the last row of the board
            row = boardSize - 1;
            //remove the solution for the last row of the board
            while (column == boardSize-1){
                
                //go back one row and remove the piece
                column = goBack(row);
                row--;
                steps++;
                
            }
            //set column to the next column than the last solution fo the last row 
            column++;
          
        }

    const response = {
        statusCode: 200,
        body: "all done!"
        
    };
    return response;
};


//function to go back a row and remove a queen. calls removePiece
//returns the column from which the piece was removed
function goBack(row){

      //go back 1 row 
      row--;
      //set current column to that row's solution
      var column = solution[row];
      //remove queen
      removePiece(row);
      
      //return columns from where the queen was removed
      return column;
}

//function to add a new queen to the board and marks all shadow cells    
function addPiece(column,row){
    chessBoard[column][row] = "X";
     //add column number to solution array
    solution[row] = column;
    console.log('placed row ' + row+' column ' + column);
    console.log ('solution till now' + solution);
    //mark all areas that are blocked because of 
    //the current placement
    markQueensShadow(column,row,1);
    
    
}

//function to remove a queen
function removePiece(row){
    let column = solution[row];
    //remove the last placed queen
    chessBoard[column][row] = 0;
    //remove it from solution
    solution[row] = 0;
    console.log('removed row ' + row +' column ' + column);
    console.log ('solution till now' + solution);
    //put the next column from the last placed as the active
    //column=lastPlacedColumn+1;
    //unmark all areas that are now open
    //
    markQueensShadow(column,row,-1);    
}

//function to add (paramer of 1) or remove (parameter of -1) the
//'threatened' cells if a queen is added or removed
//if continues to increment the count of the 'threat' for overlapping 'threats'
function markQueensShadow(column,row,counter){
    
     for (var i=0;i<boardSize;i++){
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




