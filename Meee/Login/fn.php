<?php

$u = $_POST["username"];
$p = $_POST["password"];

if (strlen($u) > 3 && strlen($p) > 7) {
    include "../edb/functions.php";
    $accOBJ = (new EDB("../edb/databases/accounts.edb", "undefined", "Accounts","AHHH SHIT... HERE WE GO AGAIN...."))->formatAsObj()["content"];
    if (isset($accOBJ[$u]) && $accOBJ[$u]["password"] == $p) {
        session_start();
        $_SESSION["username"] = $u;
        $_SESSION["password"] = $p;
        header("Location: ../");
    } else {
        header("Location: ./");
    }
} else {
    header("Location: ./");
}


