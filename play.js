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

    changePlayers();
    hasWon(columnNumber, firstEmptyIndex)
}

columns.forEach(column => column.addEventListener('click', drop))


function changePlayers(){
    currentPlayer === 1 ? currentPlayer = 2 : currentPlayer = 1;
    currentColor === 'yellow' ? currentColor = 'red' : currentColor = 'yellow';
    playerDisplay.textContent = currentPlayer;
}

function hasWon(column, space){
    //check row
    var row =[];
    for(var i =0; i< 7; i++ ){
        row.push(gameBoardColumns[i][space])
    }

    //check column


    //check diagonals

}
