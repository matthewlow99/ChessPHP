<?php
    session_start();
    include("../config/database_connect.php");

    $res = getCurrentTurn();
    $_SESSION['ct'] = getCurrentTurn();
    echo $_SESSION['ct'];
?>