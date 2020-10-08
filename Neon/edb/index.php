<?php
$ap = "x7y8z9";
$closed = true;


if (isset($_POST["ap"]) && $_POST["ap"] == $ap && !$closed) { ?>













    // CONSOLE
    <!DOCTYPE html>
    <html lang="en">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Console</title>
    </head>

    <body>
        <?php


        ?>
    </body>

    </html>




















    <?php } else {
    if ($closed) header("Location: ../");
    else { ?>

        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Console</title>
        </head>

        <body>
            <form action="" method="post">
                <input type="text" name="ap" id="">
                <input type="submit" value="Log In">
            </form>
        </body>

        </html>


<?php }
} ?>