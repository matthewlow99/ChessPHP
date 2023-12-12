var turn = "";
var player = "";

getCurrentTurn();
getPlayerColor();

document.addEventListener("keypress", function c(e){
    if(e.key == "q"){
        changeTurn();
    }
    else if(e.key == "`"){
        resetBoard();
    }
});
function resetBoard(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/resetBoard.php");
    xhl.onload = function(){
        var x = new XMLHttpRequest();
        x.open("GET", "ajax/newBoard.php");
        x.onload = function(){};
        x.send();
    };
    xhl.send(); 
}

function getCurrentTurn(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/getCurrentTurn.php");
    xhl.onload = function(){
        turn = this.responseText;
    };
    xhl.send();
}
function changeTurn(){

    // if(turn == 'white')
    //     turn = 'black';
    // else if(turn == 'black')
    //     turn = "white";
    
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/endTurn.php");
    xhl.onload = function(){
        // drawBoard();
    };
    xhl.send();

    
}
function getPlayerColor(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/playerPiece.php");
    xhl.onload = function(){
        player = this.responseText;
    };
    xhl.send();
}

function endTurn(){
    
}