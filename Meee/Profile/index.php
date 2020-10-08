<?php
session_start();
if (!(isset($_SESSION["username"]) &&
    isset($_SESSION["password"]))) {
    header("Location: ../");
}

include "../edb/functions.php";

$accounts = new EDB("../edb/databases/accounts.edb", "undefined", "Accounts", "AHHH SHIT... HERE WE GO AGAIN....");
$accOBJ = $accounts->formatAsObj()["content"];
if (!(isset($accOBJ[$_SESSION["username"]]) &&
    $accOBJ[$_SESSION["username"]]["password"] == $_SESSION["password"])) {
    header("Location: ../");
}

$username = $_SESSION["username"];
$user = $accOBJ[$_SESSION["username"]];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $_SESSION["username"] ?></title>
    <link rel="shortcut icon" type="image/x-icon" href="../assets/<?php echo $user["image"] ?>">
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../Neon(c)/require.css">
    <link rel="stylesheet" href="../Neon(c)/main.css">
    <script src="../Neon(c)/main.js"></script>
    <script src="script.js"></script>
    <?php includeJS("../"); ?>
</head>

<body>
    <div id="NEON_loading">
        <span class="NEON_loading-i" id="i1"></span>
        <span class="NEON_loading-i" id="i2"></span>
        <span class="NEON_loading-i" id="i3"></span>
        <span class="NEON_loading-i" id="i4"></span>
    </div>

    <menu id="profile" class="p10 flex column aic jcb">
        <div id="topSide" class="flex column">
            <a href="../" class="menu-item">Saved Cards</a>
            <a href="../" class="menu-item">Your Profile</a>
            <a href="../" class="menu-item">Profile Settings</a>
        </div>
        <a href="../exit.php" class="menu-item">Disonnect :(</a>
    </menu>
    <header class="flex row aic jcb p10">
        <div id="leftSide" class="flex row aic jcb">
            <button id="menu"></button>
            <input type="text" id="searchInput" placeholder="#PeaceForArmenians">
        </div>
        <div id="rightSide" class="flex row aic jca">
            <p id="Nickname">
                <?php echo $_SESSION["username"] ?>
            </p>
            <span id="userImage" style="background-image: url('../assets/<?php echo $user["image"] ?>')">

            </span>
        </div>
    </header>


    <main id="profile">
        <div id="buttonsAdd">
            <button id="addCard">New Card</button>
            <button id="addMoment">New Moment</button>
            <button id="addChat">New Chat</button>
        </div>
        <div class="content" id="contentCards">
            <?php
            $cards = (new EDB("../edb/databases/cards.edb"));
            $cardsOBJ = $cards->formatAsObj()["content"];
            for ($i = 0; $i < count($cards->content); $i++) {
                for ($j = 0; $j < count($user["subs"]); $j++) {
                    if ($user["subs"][$j] == $cards->content[$i][1][1]) {
                        $card = $cardsOBJ[$cards->content[$i][0]];
            ?>
                        <div class="card">
                            <div class="creator flex row aic jcb">
                                <div class="leftSide flex row aic">
                                    <span class="creatorProfileImage" style="background-image: url('../assets/<?php echo $accOBJ[$card["nickname"]]["image"] ?>')"></span>
                                    <p class="creatorNickname"><?php echo $card["nickname"] ?></p>
                                </div>
                                <div class="rightSide">

                                </div>
                            </div>
                            <div class="cardContent">
                                <h1 class="cardHeading"><?php echo $card["heading"] ?></h1>
                                <div class="cardImageBG flex row aic jcc" style="background-image: url('../assets/cardImages/<?php echo $card["image"] ?>')">
                                    <div class="cardImageCT">
                                        <span class="cardImageMN" style="background-image: url('../assets/cardImages/<?php echo $card["image"] ?>')"></span>
                                    </div>
                                    <div class="cardDescription">
                                        <p>
                                            <?php echo $card["description"] ?>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
            <?php
                    }
                }
            }
            ?>
        </div>
        <div class="fullscreen oxh oyh flex column aic jcb" id="addCard">
            <div class="formCont flex column aic jcc addCard">
                <form action="./fns/addCard.php" method="post" enctype="multipart/form-data">
                    <input type="file" class="none" name="image" id="acImage">
                    <input type="text" name="heading" id="acHeading" placeholder="Card Heading">

                    <p class="addCard" id="fileName">There's No Selected Image</p>
                    <input type="button" value="Choose Image" class="addCard" id="fileButton">

                    <textarea class="addCard" name="description" id="acDescription" cols="30" rows="10" placeholder="Some text here..."></textarea>
                    <input type="submit" value="Create">
                </form>
            </div>
            <div class="buttons">
                <button class="addCard Cancel">Cancel</button>
            </div>
        </div>
        <div id="searchBox" class="none">

        </div>
    </main>
    <footer>

    </footer>
</body>

</html>