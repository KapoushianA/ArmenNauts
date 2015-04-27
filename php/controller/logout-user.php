<?php
    require_once(__DIR__ . "/../model/config.php");
    
    unset($_SESSION["authenticated"]);
    
    //if you log out you go to index page//
    session_destroy();
    header("Location: " . $path . "index.php");

