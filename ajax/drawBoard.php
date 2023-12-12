<?php
    include_once("../config/database_connect.php");
    $out="<div class='board' id='boardContainer'>";
    $result = getPieceResult(0);

    function drawPiece($r, $c){
        $result = getPieceResult(0);
        $row = $result->fetch_all();
        //index 1 = row; index 2 = column; index 3 = color; index 0 = piece; index 6 = pid (piece ID number)
        foreach($row as $el){
            if($el[1] == $r && $el[2] == $c){
                $im = $el[3]."_".$el[0].".png";
                $img = "id='piece'> <img src='chess_sprites/$im' class='square sprite' row='$r' col='$c' color='$el[3]' piece='$el[0]' pid='$el[6]' hasMoved='$el[7]'>";
                return $img;
            }
        }
        return ">";
    }

    for($i = 0; $i < 64; $i++){
        
        $r = (int)($i / 8);
        $c = $i%8;
        
        if((($i+$r) % 2) == 0){
            $out.="<div class='odd square' row='$r' col='$c' ";
        }
        else{
            $out.="<div class='even square' row='$r' col='$c' ";
        }
    
        $out.=drawPiece($r, $c);

        $out.="</div>";
    }
    $out.='</div>';   
    echo $out;
    
?>