<?php
    session_start();
    include("../config/database_connect.php");
    
    echo $_SESSION['color']."  |  ".$_SESSION['gid'];
?>