<?php
include "edb/functions.php";

$accountsDB = new EDB("./edb/databases/accounts.edb", "undefined", "Accounts", "AHHH SHIT... HERE WE GO AGAIN....");

$accounts = $accountsDB->formatAsObj()["content"];
session_start();

if (isset($_SESSION["username"]) && isset($_SESSION["password"]) && isset($accounts[$_SESSION["username"]]) && $accounts[$_SESSION["username"]]["password"] == $_SESSION["password"]) {
    header("Location: ./Profile");
} else {
    unset($_SESSION["username"]);
    unset($_SESSION["password"]);
    header("Location: ./Login");
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirect</title>
</head>
<body>
    
</body>
</html>