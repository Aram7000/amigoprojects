<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Log In</title>
    <link rel="stylesheet" href="../style.css">
    <link rel="stylesheet" href="../Neon(c)/require.css">
    <link rel="stylesheet" href="../Neon(c)/main.css">
    <script src="../Neon(c)/main.js"></script>
    <script src="./script.js"></script>
</head>

<body>
    <div id="NEON_loading">
        <span class="NEON_loading-i" id="i1"></span>
        <span class="NEON_loading-i" id="i2"></span>
        <span class="NEON_loading-i" id="i3"></span>
        <span class="NEON_loading-i" id="i4"></span>
    </div>
    <main id="login">
        <form action="fn.php" method="post" id="login">
            <h1 id="login">Register</h1>
            <input type="text" name="username" id="username" placeholder="Nickname">
            <input type="password" name="password" id="password" placeholder="Password">
            <input type="password" name="repeatPassword" id="repeatPassword" placeholder="Repeat Password">
            <input type="submit" value="Connect To World">
            <div id="or">
                <hr>
                <p id="or">OR</p>
            </div>
            <a href="../Login" id="hnac">Log in</a>
        </form>
    </main>
    <footer>

    </footer>
</body>

</html>