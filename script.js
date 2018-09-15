
//console.log("Yay");


var origBoard;
const huPlayer = 'O';
const aiPlayer = 'X';
// Where on the board there's a win (Combos)
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]

]

const cells = document.querySelectorAll('.cell');


// Start Game 
startGame();
function startGame() {
    document.querySelector(".endgame").style.display = "none"
    // make array 0-9
    origBoard = Array.from(Array(9).keys())
    
    // remove X's and O's at restart 
    for (var i = 0; i < cells.length; i++) {
        cells[i].innerText = ''; 
        // restart highlight each square 
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }
}
// return id of what square is clicked
function turnClick(square) {
    if (typeof origBoard[square.target.id] == 'number') {
      turn(square.target.id, huPlayer)
      if (!checkTie()) turn(bestSpot(), aiPlayer);
    }
    //turn(square.target.id, huPlayer)
    // AI's turn
    //if (!checkTie()) turn(bestSpot(), aiPlayer);
  }

function turn(squareId, player) {
    origBoard[squareId] = player;
    document.getElementById(squareId).innerText = player;
    // check if game won
    let gameWon = checkWin(origBoard, player)
    if (gameWon) gameOver(gameWon)
}
// find all places on board that have already been played in 
// if element = player then con i 
function checkWin(board, player) {
 let plays = board.reduce((a, e, i) => 
   (e === player) ? a.concat(i) : a,[])
   // if no one wins = null 
   let gameWon = null;
   // loop through winning combos
   for (let [index, win] of winCombos.entries()) {
       //has the winner played in every winning spot 
    if (win.every(elem => plays.indexOf(elem) > -1)) {
        //whick combo and player won
        gameWon = {index: index, player: player};
        break;
    }
   }
   return gameWon;
}

// game over. 
// highlight squares that win 
// no more clicks when game is over

function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
          gameWon.player === huPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == huPlayer ? "You win!" : "You lose");
}

// AI
// X's

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;

}

function emptySquares() {
    return origBoard.filter(s => typeof s == 'number');
  }
  
function bestSpot() {
    return emptySquares()[0];
}

function checkTie() {
    // every square is filled
    if (emptySquares().length == 0) {
        for (var i = 0; i < cells.length; i++) {
            cells[i].style.backgroundColor = "green"; 
            cells[i].removeEventListener('click', turnClick, false);
        }
        declareWinner("Tie Game!")
        return true;
    }
    return false; 
}