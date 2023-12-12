var selectedPiece = "";
var selectedID = 0;
var lastRook = 0;
var selectedHasMoved = 'false';

var refreshTimer = 3000; //milliseconds between page refreshes
var update = true;
var lastState = turn;

drawBoard();


function refreshHandler(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/getCurrentTurn.php");
    xhl.onload = function(){
       turn = this.responseText;
        if(player == lastState){
            document.getElementById("refresh").textContent = "Refreshed Paused";
            setTimeout(function(){refreshHandler(); lastState = turn;}, 200);
        }
        else{
            document.getElementById("refresh").textContent = "Refreshed Played";
            lastState = turn;
            drawBoard(); 
        }
    }
    xhl.send();
}


function drawBoard(){
    var xhl = new XMLHttpRequest();
    xhl.open("GET", "ajax/drawBoard.php");
    xhl.onload = function(){
        
        
        document.getElementById("boardContainer").innerHTML = this.responseText;
        document.getElementById("currentTurn").textContent = turn;
        document.getElementById("player").textContent = player;

        if(player == turn)
            addPieceListener();

        setTimeout(function(){refreshHandler();}, 200);
        
        
    };
    xhl.send();
}

function addPieceListener(){ 
    var collection = document.getElementsByTagName("IMG");
    var arr = Array.from(collection);
    
    arr.forEach(e => {
        if(e.getAttribute("color") == player){
            
            e.addEventListener("click", function click(){
                selectedPiece = e.getAttribute("piece");
                selectedID = e.getAttribute("pid");
                selectedHasMoved = e.getAttribute("hasMoved");

                if(e.getAttribute("piece") == 'rook'){
                    lastRook = selectedID;
                    console.log(lastRook);
                }
                pieceHandler(selectedPiece, Number(e.getAttribute("row")), Number(e.getAttribute("col")));
            });
            
            e.addEventListener("mouseenter", function o(){
                e.classList.add("spriteHover");
            })
            e.addEventListener("mouseleave", function o(){
                e.classList.remove("spriteHover");
            })
        }
        else{
            e.classList.add("noClick");
        }
    });
}




// function resetBoard(){
//     document.addEventListener("keypress", function res(e){
//         if(e.key == '`'){
//             var xhl = new XMLHttpRequest();
//             xhl.open("GET", "ajax/newBoard.php");
//             xhl.onload = function(){
//                 drawBoard();
//                 console.log("clicked");
//             }
//             xhl.send();
            
//         }
//     })
// } resetBoard();