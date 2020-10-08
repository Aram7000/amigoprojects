<?php
include "./functions.php";
if(new EDB($_POST["path"], $_POST["password"])) {
    $file = fopen($_POST["path"], "r");
    $file = file_get_contents($_POST["path"]);
    echo $file;
} else {
    echo false;
}
