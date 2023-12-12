var allyHit = "null";
var disableKing = false;
var localSelect = "";

function pieceHandler(piece, r, c){
    clearValid();
    allyHit = "null";
    console.log("piece");
    
    if(piece == 'pawn'){
        pawnCheck(r, c);
    }
    else if(piece == 'bishop'){
        movementLeg(r, c, -1, 1);
        movementLeg(r, c, -1, -1);
        movementLeg(r, c, 1, 1);
        movementLeg(r, c, 1, -1);
        disableKing = false;
    }
    else if(piece == 'rook'){
        movementLeg(r, c, 1, 0);
        movementLeg(r, c, -1, 0);
        movementLeg(r, c, 0, 1);
        movementLeg(r, c, 0, -1);
        
        disableKing = true;
        castleListener();
    }
    else if(piece == "king"){
        movementLeg(r, c, 1, 0, 1);
        movementLeg(r, c, -1, 0, 1);
        movementLeg(r, c, 0, 1, 1);
        movementLeg(r, c, 0, -1, 1);
        movementLeg(r, c, -1, 1, 1);
        movementLeg(r, c, -1, -1, 1);
        movementLeg(r, c, 1, 1, 1);
        movementLeg(r, c, 1, -1, 1);
    }
    else if(piece == "knight"){
        movementLeg(r, c, 1, 2, 1);
        movementLeg(r, c, -1, 2, 1);
        movementLeg(r, c, 1, -2, 1);
        movementLeg(r, c, -1, -2, 1);
        disableKing = false;
        movementLeg(r, c, -2, 1, 1);
        movementLeg(r, c, -2, -1, 1);
        movementLeg(r, c, 2, 1, 1);
        movementLeg(r, c, 2, -1, 1);
    }
    else if(piece == "queen"){
        movementLeg(r, c, 1, 0);
        movementLeg(r, c, -1, 0);
        movementLeg(r, c, 0, 1);
        movementLeg(r, c, 0, -1);
        
        movementLeg(r, c, -1, 1);
        movementLeg(r, c, -1, -1);
        movementLeg(r, c, 1, 1);
        movementLeg(r, c, 1, -1);
    }
}



function validSqListener(){
    document.body.addEventListener("click", function(e){

        if(e.target.classList.contains("valid")){    
            var xhl = new XMLHttpRequest();
            xhl.open("GET", "ajax/movePiece.php?r="+e.target.getAttribute("row")+"&c="+e.target.getAttribute("col")+"&pid="+selectedID);
            xhl.onload = function(){
                drawBoard();
                changeTurn();
            }
            xhl.send();
        }
    });
} validSqListener();

function movementLeg(r, c, ydir, xdir, space = 10){
    let enemy = (player == "white") ? "black" : "white";
    var count = 0;
    localSelect = selectedID;
    while(true) {
        
        r = r + ydir;
        c = c + xdir;
        if(r <= 7 && r >= 0 && c<=7 && c>=0){
            var sq = returnSquare(r, c);
            if(sq.firstElementChild != null){
                if(sq.firstElementChild.getAttribute("color") == enemy){
                    
                    sq.classList.add("valid");
                    break;
                }
                else if(sq.firstElementChild.getAttribute("color") == player){
                    if(allyHit != 'king'){
                        allyHit = sq.firstElementChild.getAttribute("piece");
                    }
                    
                    break;
                }
            }
            else{
                sq.classList.add("valid");
            }
            
        }
        else{
            break;
        }
        count++;
        if(count == space){
            break;
        }
    }
    
    return;
    
}

function castleListener(){
    var king = document.querySelector("[piece='"+"king'][color='"+player+"']");
    


    if(selectedHasMoved == 'false' && king.getAttribute("hasMoved") == 'false' && allyHit == 'king'){
        king.classList.add("validCastle");
        king.addEventListener("click", function(){
            var xhl = new XMLHttpRequest();
            xhl.open("GET", "ajax/castlePiece.php?rid="+lastRook+"&kid="+selectedID);
            xhl.onload = function(){
                console.log(this.responseText);
                drawBoard();
                changeTurn();
            }
            xhl.send();
        })
    }

    
    // console.log(allyHit + " | " + king.getAttribute("pid") + " | " + selectedID + " | " + canCastle);
    
}




function pawnCheck(r, c){
    let enemy = (player == "white") ? "black" : "white";
    var sq;

    var firstRow;
    var direction;

    if(player == 'white'){
        firstRow = 6;
        direction = -1;
    }
    else{
        firstRow = 1;
        direction = 1;
    }

    try{
        sq = (returnSquare(r+direction, c+1));
        if(sq.firstElementChild != null){
            
            if(sq.firstElementChild.getAttribute("color") == enemy){
                sq.classList.add("valid");
            }
        }
        sq = (returnSquare(r+direction, c-1));
        if(sq.firstElementChild != null){
            
            if(sq.firstElementChild.getAttribute("color") == enemy){
                sq.classList.add("valid");
            }
        }
    }
    catch{}

    
    if(r == firstRow){
        for(var i = 1; i < 3; i++){
            var temp_row = r + (i * direction);
            sq = returnSquare(temp_row, c);
            if(sq.firstElementChild == null){
                sq.classList.add("valid");
            }
            else{
                return;
            }
        }
    }
    else{
        var temp_row = r + (direction);
        sq = returnSquare(temp_row, c);
        if(sq.firstElementChild == null){
            sq.classList.add("valid");
        }
        else{
            return;
        }
    }
               
    
}





function returnSquare(r, c){
    if(r > 7 || r < 0 || c > 7 || c < 0){
        return null;
    }
    var square = document.querySelector("[row='"+r+"'][col='"+c+"']");
    return square;
}

function clearValid(){
    var arr = Array.from(document.getElementsByClassName("valid"));
    arr.forEach(e => {
        e.classList.remove("valid");
    });
}



