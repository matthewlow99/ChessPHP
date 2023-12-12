<?php
    session_start();
    include("../config/database_connect.php");

    $r = $_REQUEST['r'];
    $c = $_REQUEST['c'];

    $piece = getPieceFromLocation($r, $c);
    print_r($piece);

?>