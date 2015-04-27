<?php
    require_once(__DIR__ . "/../model/config.php");
    require_once(__DIR__ . "/../controller/login-verify.php");
    
    //the header location is going to index page//
    if(authenticateUser()) {
        header("Location: " . $path . "index.php");
        die();
    }
?>

<nav>
    <ul>
        <li><a href="<?php echo $path . "post.php"?>">Blog Post Form</a></li>
    </ul>
</nav>