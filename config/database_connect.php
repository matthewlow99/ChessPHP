<?php

    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $dbname = "chess";

    $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);



    if($conn->connect_error){
        die("Connection Failed" . $conn->connect_error);
    }
    $_SESSION['db'] = $conn;

    function getPieceResult($gameID){
        $sql = "SELECT * FROM board";
        $result = $_SESSION['db']->query($sql);
        return $result;
    }
    function getPieceFromLocation($r, $c){
        $gid = $_SESSION['gid'];
        $sql = "SELECT * FROM board WHERE row='$r' AND col='$c' AND gameID='$gid'";
        $result = $_SESSION['db']->query($sql);
        
        
        /*try{
            
            return $row['piece'];
        }
        catch(Exception) {
            return null;
        }*/
        if($result->num_rows > 0){
            $arr[2]= [];
            $row = $result->fetch_assoc();
            
            return $row['color']." ".$row['piece']." ".$row['row']." ".$row['col']." ".$row['pieceID'];
            
        }
        else{
            return "null";
        }
    }

    // function movePiece($pid, $r, $c){
    //     $gid = $_SESSION['gid'];
    //     $sql = "UPDATE board SET row='$r', col='$c' WHERE pieceID='$pid' AND gameID='$gid'";
    //     $_SESSION['db']->query($sql);
    // }
    function deletePiece($r, $c)
    {
        $gid = $_SESSION['gid'];
        $sql = "DELETE FROM board WHERE row='$r' AND col='$c' AND gameID='$gid'";
        $_SESSION['db']->query($sql);
        return 'piece deleted';
    }
    function createBoard(){
        $sql = "INSERT INTO games (currentTurn) VALUES ('white')";
        $_SESSION['db']->query($sql);

        $_SESSION['gid'] = mysqli_insert_id($_SESSION['db']);
        
    }
    function deleteBoard(){
        $sql = "DELETE FROM board";
        $_SESSION['db']->query($sql);

        $sql = "DELETE FROM games";
        $_SESSION['db']->query($sql);

    }
    function getCurrentTurn(){
        $gid = $_SESSION['gid'];
        $sql = "SELECT * FROM games WHERE gameID='$gid'";
        $result = $_SESSION['db']->query($sql);
        $row = $result->fetch_assoc();

        return ($row['currentTurn']);
    }
    function endTurn(){
        $gid = $_SESSION['gid'];
        $sql = "SELECT * FROM games WHERE gameID='$gid'";
        $result = $_SESSION['db']->query($sql);
        $row = ($result->fetch_assoc());
        $ct = ($row['currentTurn']);
        
        $nt = ($ct == 'black' ? 'white' : 'black');

        $sql = "UPDATE games SET currentTurn='$nt' WHERE gameID='$gid'";
        $_SESSION['db']->query($sql);
    
        return getCurrentTurn();

    }
    function movePiece($r, $c, $pid){
        $gid = $_SESSION['gid'];
        $sql = "SELECT * FROM board WHERE row='$r' AND col='$c' AND gameID='$gid'";
        $result = $_SESSION['db']->query($sql);
        
        
        if(($result->num_rows) > 0){
            $sql = "DELETE FROM board WHERE row='$r' AND col='$c' AND gameID='$gid'";
            $result = $_SESSION['db']->query($sql);
        }

        $sql = "UPDATE board SET row='$r', col='$c', hasMoved='true' WHERE pieceID='$pid' AND gameID='$gid'";
        $_SESSION['db']->query($sql);
    }
    function castleMove($dir, $kingID, $rookID){
        echo $dir." ".$kingID." ".$rookID;
        if($dir == 'left'){
            $sql = "UPDATE board SET col='2', hasMoved='true' WHERE pieceID='$kingID'";
            $_SESSION['db']->query($sql);
            $sql = "UPDATE board SET col='3', hasMoved='true' WHERE pieceID='$rookID'";
            $result = $_SESSION['db']->query($sql);
        }
        else if($dir == 'right'){
            $sql = "UPDATE board SET col='6', hasMoved='true' WHERE pieceID='$kingID'";
            $_SESSION['db']->query($sql);
            $sql = "UPDATE board SET col='5', hasMoved='true' WHERE pieceID='$rookID'";
            $result = $_SESSION['db']->query($sql);
        }
        echo $result;

    }
    // function takePiece($r, $c, $pid, $friendColor, $enemyColor){
    //     $sql = "SELECT * FROM board WHERE row='$r' AND col='$c'";
    //     $result = $_SESSION['db']->query($sql);
    //     $row = $result->fetch_assoc();
        
    //     if($row['$friend']);
    // }
    
    
    // function movePiece($name, $r, $c, $color){
    //     //$sql = "UPDATE board SET row='$r', col='$c' WHERE";
    // }
    
?>