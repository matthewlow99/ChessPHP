<?php
    session_start();
    include("../config/database_connect.php");

    $row = $_REQUEST['r'];
    $col = $_REQUEST['c'];
    $pid = $_REQUEST['pid'];

    deletePiece($row, $col);
?>