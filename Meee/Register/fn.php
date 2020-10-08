<?php


$u = $_POST["username"];
$p = $_POST["password"];
$r = $_POST["repeatPassword"];

if (strlen($u) > 3 && strlen($p) > 7 && $p == $r) {
    include "../edb/functions.php";
    $accounts = new EDB("../edb/databases/accounts.edb", "undefined", "Accounts", "AHHH SHIT... HERE WE GO AGAIN....");
    $accOBJ = $accounts->formatAsObj()["content"];
    if (!isset($accOBJ[$u])) {
        $table = [
            $u,
            ["password", $p],
            ["isAdmin", 0],
            ["image", "local/anonymous.jpg"],
            ["subs", [$u]],
            ["cards", []],
            ["moment", ""],
            ["chats", ["Global Chat"]],
        ];
        $accounts->addinDB($table);
        session_start();
        $_SESSION["username"] = $u;
        $_SESSION["password"] = $p;
        $accountsInfo = new EDB("../edb/databases/secureAccounts.edb");
        $table = [
            $u,
            ["image", "local/anonymous.jpg"],
            ["subs", [$u]],
            ["cards", []],
            ["moment", ""],
        ];
        $accountsInfo->addinDB($table);
        header("Location: ../");
    } else {
        header("Location: ./");
    }
} else {
    header("Location: ./");
}


?>