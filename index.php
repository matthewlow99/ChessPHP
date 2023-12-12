<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ChessApp</title>
    <link rel="stylesheet" href="css/gameSelect.css">
</head>
<body>

    <div class='title'>
        <h1>Chess!</h1>
        <form method='post'>
            <input type='radio' name='color' value='white' required>
            <label>White</label>
            <br>
            <input type='radio' name='color' value='black' required>
            <label>Black</label>
            <br>
            <input type='text' name='gameID' placeholder="Game ID" required>
            
            <input type='submit' name='submit' value='Play!'>
        </form>

    </div>
    

    <?php
    session_start();
        if(isset($_POST['submit'])){
            if(isset($_POST['color'])){
                $_SESSION['color'] = $_POST['color'];
                $gid = $_POST['gameID'];

                $dbhost = "localhost";
                $dbuser = "root";
                $dbpass = "";
                $dbname = "chess";

                $conn = new mysqli($dbhost, $dbuser, $dbpass, $dbname);

                $sql = "SELECT * FROM games WHERE gameID='$gid'";
                $result = $conn->query($sql);

                $c = $result->num_rows;
                if($c == 1){
                    header("Location: game.php");
                    $_SESSION['gid'] = $gid;
                    
                }
                else {
                    echo "Invalid GAME ID";
                }


                // header("Location: game.php");
            }
        }
    ?>

</body>
</html>