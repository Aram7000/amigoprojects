<?php

session_start();
if (!(isset($_SESSION["username"]) &&
    isset($_SESSION["password"]))) {
    header("Location: ../");
}

include "../../edb/functions.php";

$accounts = new EDB("../../edb/databases/accounts.edb", "undefined", "Accounts", "AHHH SHIT... HERE WE GO AGAIN....");
$accOBJ = $accounts->formatAsObj()["content"];
if (!(isset($accOBJ[$_SESSION["username"]]) &&
    $accOBJ[$_SESSION["username"]]["password"] == $_SESSION["password"])) {
    header("Location: ../");
}

$cards = new EDB("../../edb/databases/cards.edb",);

$username = $_SESSION["username"];
$user = $accOBJ[$_SESSION["username"]];

$h = $_POST["heading"];
$d = $_POST["description"];
if (isset($_FILES["image"]) && pathinfo($_FILES["image"]["name"])["basename"] != "") {
    $uploaddir = '../../assets/cardImages/';
    var_dump(pathinfo($_FILES["image"]["name"]));
    $path_parts = pathinfo($_FILES["image"]["name"]);
    $extension = $path_parts['extension'];
    $uploadfile = $uploaddir . "cardFile" . count($cards->content) . "." . $extension;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadfile)) {
        $table = [
            "Card_" . count($cards->content),
            ["nickname", $username],
            ["heading", $h],
            ["image", "cardFile" . count($cards->content) . "." . $extension],
            ["description", $d],
            ["removed", 0],
            ["like", [$username]],
            ["dislike", [$username]],
        ];
        $cards->addinDB($table);
    }
} else {
    $table = [
        "Card_" . count($cards->content),
        ["nickname", $username],
        ["heading", $h],
        ["image", "black.jpg"],
        ["description", $d],
        ["removed", 0],
        ["like", [$username]],
        ["dislike", [$username]],
    ];
    $cards->addinDB($table);
}


header("Location: ../");
