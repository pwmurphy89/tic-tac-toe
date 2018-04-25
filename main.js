var playerOne = true;
var playerTwo = false;
var playerOneMarked = [];
var playerTwoMarked = [];

function markBoard() {
    var ID = event.target.id;
    if(playerOne){
        event.target.innerHTML = "X";
        console.log(playerOne);
        event.target.classList.add("red");
        playerOneMarked.push(parseInt(ID.substring(ID.length -1)));
    }else{
        event.target.innerHTML = "O";
        console.log(playerOne);
        event.target.classList.add("blue");
        playerTwoMarked.push(parseInt(ID.substring(ID.length -1)));
    }
    event.target.disabled = true;
    checkForWin(playerOne);
    switchTurns();
}

function checkForWin(){
    var tie;
    winningCombos = [
        [1,2,3],[1,4,7],[1,5,9],[2,5,8],
        [3,6,9],[3,5,7],[4,5,6],[7,8,9]
    ]
    for(var i=0;i<winningCombos.length;i++){
        var playerOneCount = 0;
        var playerTwoCount = 0;
        for (var j=0;j<winningCombos[i].length;j++){
            if(playerOneMarked.includes(winningCombos[i][j])){
                playerOneCount += 1;
                if (playerOneCount == 3){
                    gameOver(tie=false);
                    return;
                }
            }
            if(playerTwoMarked.includes(winningCombos[i][j])){
                playerTwoCount += 1;
                if (playerTwoCount == 3){
                    gameOver(tie=false);
                    return;
                }
            }
        }
    }
    var squaresArray = Array.prototype.slice.call(document.querySelectorAll(".square"));
    if(squaresArray.every(square => square.disabled)){
        gameOver(tie=true);
        return;
    }
}
function switchTurns(){
    if(playerOne) {
        playerOne = false;
        playerTwo = true;
    }else{
        playerOne = true;
        playerTwo = false;
    }
}
function gameOver(tie){
    var message;
    if(tie) message = "Game Over! Tie!";
    else {
        if(playerOne) message = "Game Over! Player One Won!";
        else message = "Game Over! Player Two Won!";
    }
    document.getElementById("message").textContent = message;
    document.querySelectorAll(".square").forEach(square => square.disabled = true);
    document.getElementById("new-game").style.display = "block";
}

function newGame(){
    playerOne = true;
    playerTwo = false;
    playerOneMarked = [];
    playerTwoMarked = [];
    document.getElementById("new-game").style.display = "none";
    document.getElementById("message").textContent = '';
    document.querySelectorAll(".square").forEach(square => square.disabled = false);
    document.querySelectorAll(".square").forEach(square => square.classList.remove("red"));
    document.querySelectorAll(".square").forEach(square => square.classList.remove("blue"));
    document.querySelectorAll(".square").forEach(square => square.innerHTML = '');
}