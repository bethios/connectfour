var currentPlayer = 1;
var currentColor = 'yellow';
var playerDisplay = document.querySelector('.playerUp');

const columns = document.querySelectorAll('.column');
const gameBoardColumns = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]];

function drop(e){
    var target = document.getElementsByClassName(e.srcElement.parentNode.classList);
    var columnNumber = e.srcElement.parentNode.classList.value.slice(-1);

    var firstEmptyIndex = gameBoardColumns[columnNumber].lastIndexOf(0);

    var dropped = target[0].children[firstEmptyIndex];

    dropped.style.backgroundColor = currentColor;
    gameBoardColumns[columnNumber][firstEmptyIndex] = currentPlayer;

    tally(Number(columnNumber), firstEmptyIndex);
    changePlayers();
}

columns.forEach(column => column.addEventListener('click', drop))


function changePlayers(){
    currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
    currentColor === 'yellow' ? currentColor = 'red' : currentColor = 'yellow';
    playerDisplay.textContent = currentPlayer;
}

function tally(columnIndex, spaceIndex){
    //tally row
    var row =[];
    for(let i =0; i< 7; i++ ){
        row.push(gameBoardColumns[i][spaceIndex])
    }
    //tally column
    var column = gameBoardColumns[columnIndex];

    //tally diagonals
    var diagonalUp = [gameBoardColumns[columnIndex][spaceIndex]];
    var diagonalDown = [gameBoardColumns[columnIndex][spaceIndex]];

    var s = 1;

    while(columnIndex -s >= 0 || spaceIndex - s >= 0 || columnIndex + s <= 6 || spaceIndex + s <= 5){
        if(columnIndex + s <= 6 && spaceIndex + s <= 5 ) diagonalDown.push(gameBoardColumns[columnIndex + s][spaceIndex + s]);
        if(columnIndex - s >= 0 && spaceIndex - s >= 0 ) diagonalDown.unshift(gameBoardColumns[columnIndex - s ][spaceIndex - s]);
        if(columnIndex + s <= 6 && spaceIndex - s >= 0 ) diagonalUp.push(gameBoardColumns[columnIndex + s ][spaceIndex - s]);
        if(columnIndex - s >= 0 && spaceIndex + s <= 5 ) diagonalUp.unshift(gameBoardColumns[columnIndex - s ][spaceIndex + s]);
        s++;
    }

    console.log(diagonalDown)
    isAWinner([row, column, diagonalDown, diagonalUp])
}

function isAWinner(sequences){
    for(var i = 0; i < sequences.length; i++){
        var test = sequences[i].join("");
        if(test.indexOf("1111") !== -1 || test.indexOf("2222") !== -1){
            var announce = document.querySelector('.announcement');
            announce.textContent = "YOU'VE WON!"
        }
    }
}
