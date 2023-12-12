<?php
    session_start();
    include("../config/database_connect.php");
    //pID: white = 0, black=1;
    
    createBoard();
    
    function build(){
        
        addPiece("rook", "white", "7", "0", "0");
        addPiece("knight", "white", "7", "1", "0");
        addPiece("bishop", "white", "7", "2", "0");
        addPiece("queen", "white", "7", "3", "0");
        addPiece("king", "white", "7", "4", "0");
        addPiece("bishop", "white", "7", "5", "0");
        addPiece("knight", "white", "7", "6", "0");
        addPiece("rook", "white", "7", "7", "0");

        addPiece("rook", "black", "0", "0", "1");
        addPiece("knight", "black", "0", "1", "1");
        addPiece("bishop", "black", "0", "2", "1");
        addPiece("queen", "black", "0", "3", "1");
        addPiece("king", "black", "0", "4", "1");
        addPiece("bishop", "black", "0", "5", "1");
        addPiece("knight", "black", "0", "6", "1");
        addPiece("rook", "black", "0", "7", "1");

        for($i = 0; $i<8; $i++){
            addPiece("pawn", "black", "1", $i, "1");
            addPiece("pawn", "white", "6", $i, "0");
        }
        
    }
    build();

    
    function addPiece($name, $color, $row, $col, $pID){
        $gid = $_SESSION['gid'];
        $sql = "INSERT INTO board (piece, row, col, color, gameID, playerID) VALUES ('$name', '$row', '$col', '$color', '$gid', '$pID')";
        $_SESSION['db']->query($sql);
    }

    // function updatePiece($name, $color, $row, $col, $pID, $gameID){
    //     $sql = "UPDATE board (piece, row, col, color, gameID, playerID) VALUES ('$name', '$row', '$col', '$color', '$gameID', '$pID')";
    //     $_SESSION['db']->query($sql);
    // }
?>