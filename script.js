window.addEventListener("load", () => {
    $.ajax({
        type: 'POST',
            url: toRoot + 'echo.php',
            data: {
                data: "asd",
            },
            success: function (data) {
                alert(data)
            }
    })


    setTimeout(() => {
        document.querySelector("#NEON_loading").classList.add("fadeout");
    }, 1000);
});