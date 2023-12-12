var piece = "";
var data = "";
var points = [];

var playerData = [];


var pieceColor = 'white';
var playerPiece = "";

var friendColor = pieceColor + "Sq";
var enemyColor = (pieceColor == 'black' ? 'whiteSq' : 'blackSq');

var ec = (pieceColor == 'black' ? 'white' : 'black');




ajaxDraw();
turn();
setInterval(function draw(){
    var varr = document.getElementsByClassName("valid");
    if(varr.length == 0){
        turn();
    }    

},  1000000);

document.body.addEventListener("keypress", function g(e){
    if(e.key == '`'){
        var xhl = new XMLHttpRequest();
        xhl.open("GET", "ajax/resetBoard.php",);
        xhl.onload = function(){
            ajaxCreate();
            ajaxDraw();
            setTimeout(function g(){
                location.reload();
            }, 100);
        }
        xhl.send();
    }
    else if(e.key=='q'){
        var xhl = new XMLHttpRequest();
        xhl.open("GET", "ajax/endTurn.php");
        xhl.onload = function(){
            console.log("blah");
            //document.getElementById("test").value = this.responseText;
        }
        xhl.send();
    }
})

function displaySession(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/getCurrentTurn.php",);
    xhl.onload = function(){
        //document.getElementById("test").value = this.responseText;
    }
    xhl.send();
} displaySession();

function turn(){
    ajaxGetCurrentTurn();
    clear();
}
function ajaxGetCurrentTurn(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/getCurrentTurn.php",);
    xhl.onload = function(){
        pieceColor = this.responseText;

        friendColor = pieceColor + "Sq";
        enemyColor = (pieceColor == 'black' ? 'whiteSq' : 'blackSq');

        document.getElementById("currentTurn").textContent = pieceColor + "'s Turn!";
        console.log(ec);

        var bg = (pieceColor == 'white') ? 'black' : 'white';
        document.getElementById("currentTurn").style = "color: " + bg + "; background-color: " + pieceColor + ";";
        
        ajaxGetPlayerColor();
        ajaxDraw();
    }
    xhl.send();
}

function ajaxGetPlayerColor(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/playerPiece.php",);
    xhl.onload = function(){
        playerPiece = this.responseText;

        
        ajaxDraw();
        document.getElementById("test").value = ("player: " + playerPiece + "  |  turn: " + pieceColor);
    }
    xhl.send();
}



function getPieceClicked(){
    if(pieceColor == playerPiece){
        document.getElementById('boardContainer').addEventListener("click", function g(e){
            if(e.target.classList.contains("square")){
                var sq = e.target;
                let r = sq.getAttribute("row");
                let c = sq.getAttribute("col");

                // points = [];
                // piece = "";
                ajaxGetPiece(r, c);
            }
        });
    }
}

function ajaxEndTurn(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/endTurn.php");
    xhl.onload = function() {
        turn();
        //location.reload();
    }
    xhl.send();
}

function ajaxCreate(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/newBoard.php?");
    xhl.onload = function(){
        console.log(this.responseText);
        
    }
    xhl.send();
}
function ajaxDraw(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/drawBoard.php");
    xhl.onload = function(){     
        document.getElementById("container").innerHTML = this.responseText;
        getPieceClicked();
        ec = (pieceColor == 'black' ? 'white' : 'black');

    }
    xhl.send();
}
function ajaxGetPiece(r, c){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/getPiece.php?r="+r+"&c="+c);
    xhl.onload = function(){
        arr = this.responseText.split(" ");
        data = arr;
        
        if(data[0] == pieceColor){
            checkMove(arr, r, c);
        }
        colorSquares();
    }
    xhl.send();
}
function checkMove(pieceData, r, c){
    color = pieceData[0];
    piece = pieceData[1];
    points = [];
    
    var color = pieceData[0];

    if(piece == 'pawn'){
        checkPawn(r, c, color)
        checkPawnTake(r, c);
    }
    
    else if(piece == 'bishop'){
        
        checkDiag(r, c);   
    }
    else if(piece == 'queen'){
        checkDiag(r, c);
        checkStraight(r, c);
    }
    else if(piece == 'rook'){
        checkStraight(r, c);
    }
    else if(piece == 'knight'){
        checkKnight(r, c);
    }
    

    return points;
}
function checkPawn(r, c){

    

    if(pieceColor == 'white'){
        
        let temp_row = r-1;
        
        if((allyHit(temp_row, c) == false) && (enemyHit(temp_row, c) == false)){
            
            let point = [temp_row, c];
            points.push(point);

            if(r == 6){
                temp_row = temp_row-1;
                if((allyHit(temp_row, c) == false) && enemyHit(temp_row, c) == false){
                    let point = [temp_row, c];
                    points.push(point);
                }
                else{
                    return null;
                }   
            
            }

        }
    }
    else if(pieceColor == 'black'){
       
        let temp_row = r-(-1);
        
        if((allyHit(temp_row, c) == false) && (enemyHit(temp_row, c) == false)){
            
            let point = [temp_row, c];
            points.push(point);

            if(r == 1){
                temp_row = temp_row-(-1);
                if((allyHit(temp_row, c) == false) && enemyHit(temp_row, c) == false){
                    let point = [temp_row, c];
                    points.push(point);
                }
                else{
                    return null;
                }   
            
            }

        }
    }
}
function checkPawnTake(r, c){
    let temp_col = c-1;
    let temp_row = r;
    if(pieceColor == 'white'){
        temp_row--;
        
    }
    else if(pieceColor == 'black'){
        temp_row++;
        
    }

    if(temp_col >= 0){
        var sq = document.querySelector("div[row='"+(temp_row)+"'][col='"+(temp_col)+"']");
        
        if(sq.id == enemyColor){
            
            let point = [temp_row, temp_col];
            points.push(point);
        }
    }

    
    temp_col = c-(-1);

    if(temp_col <= 7){
        
        sq = document.querySelector("div[row='"+(temp_row)+"'][col='"+(temp_col)+"']");
        if(sq.id == enemyColor){
            let point = [temp_row, temp_col];
            points.push(point);
        }
    }

    
}

function checkStraight(r, c){
    let temp_row = r;
    let temp_col = c;
    while(true){
        if(temp_row-- > 0){

            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_row++ < 7){
            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_col-- > 0){

            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_col++ < 7){
            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    
}

function checkDiag(r, c){

    let temp_row = r;
    let temp_col = c;
    while(true){
        
        if((temp_row-- > 0) && (temp_col++ < 7)){
            
            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_row ++ < 7 && temp_col++<7){

            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_row ++ < 7 && temp_col-->0){

            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
    temp_row = r;
    temp_col = c;
    while(true){
        if(temp_row-- > 0 && temp_col-->0){

            if(allyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }

            let point = [(temp_row), temp_col]
            points.push(point);

            if(enemyHit(temp_row, temp_col)){
                console.log(temp_row + " " + temp_col);
                break;
            }
        }
        else{
            break;
        }
    }
}
function checkKnight(r, c){
   
    r = Number(r);
    c = Number(c);
    karr = [[r+2, c+1], [r+2, c-1], [r-2, c+1], [r-2, c-1], [r+1, c+2], [r-1, c+2], [r+1, c-2], [r-1, c-2]]

    karr.forEach(e=>{
        if(e[0] >= 0 && e[0] <= 7){
            if(e[1] >= 0 && e[1] <= 7){

                if(allyHit(e[0], e[1]) == false){
                    let point = [e[0], e[1]];
                    points.push(point);
                }
                
            }
        }
    });
}

function enemyHit(r, c){
    let qs = "div[row='"+r+"'][col='"+c+"']"
    let sq = document.querySelector(qs);
    
    if(sq.id == enemyColor){
        return true;
    }
    return false;
}
function allyHit(r, c){
    let qs = "div[row='"+r+"'][col='"+c+"']"
    let sq = document.querySelector(qs);
    if(sq.id == friendColor){
        return true;
    }
    return false;
}

function colorSquares(){
    sq = Array.from(document.getElementsByClassName("square"));
    
    sq.forEach(e=> {
        if(e.tagName == 'DIV'){
            e.classList.remove("valid");
        }
    })

    sq.forEach(e => {
        
        if(e.tagName == 'DIV'){
            let r = e.getAttribute("row");
            let c = e.getAttribute("col");
            points.forEach(i => {
                if(i[0] == r && i[1] == c){
                    e.classList.add("valid");
                }
            });
        }
    });
    movePiece();
    
}

function movePiece(){
    if(playerPiece == pieceColor)
    document.getElementById("boardContainer").addEventListener("click", function g(e){
        var tar = document.querySelector("div[row='"+e.target.getAttribute('row')+"'][col='"+e.target.getAttribute('col')+"']");
        if((tar.classList.contains("valid"))){

            var mr = e.target.getAttribute("row");
            var mc = e.target.getAttribute("col");
            var pid = arr[4];

            
            ajaxMove(mr, mc, pid);
            ajaxDraw();
            
            
        }
    })
}
function ajaxMove(r, c, pid){
    
    var  xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/movePiece.php?r="+r+"&c="+c+"&pid="+pid+"&e="+ec);
    xhl.onload = function (){
        console.log(this.responseText);
        clear();
    }
    xhl.send();
}

function clear(){
    points=[];
    piece='';
    data='';
    let valids = Array.from(document.getElementsByClassName("valid"));
    valids.forEach(e => {
        e.classList.remove("valid");
    });
    ajaxDraw();
    
}

// setInterval(function te(){
//     test();
// }, 1000);
