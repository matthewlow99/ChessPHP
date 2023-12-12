<?php
    include_once("../config/database_connect.php");

    $rookPID = $_REQUEST['rid'];
    $kingPID = $_REQUEST['kid'];
    $dir = "";

    if($rookPID > $kingPID){
        $dir = "right";
    }
    else{
        $dir = "left";
    }

    castleMove($dir, $kingPID, $rookPID);
?>