<?php
    require_once(__DIR__ . "/database.php");
    session_start();
    session_regenerate_id(true);
    
    //this is where it takes me when i run my blog//
    $path = "/ArmenNauts/php/";
    
    $host = "localhost";
    $username = "root";
    $password = "root";
    $database = "awesomenauts_db";
    
    // if its not set you connect to a new database if it is you join a session//
    if(!isset($_SESSION["connection"])) {
        $connection = new Database($host, $username, $password, $database);
        $_SESSION["connection"] = $connection;
    }