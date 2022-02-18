window.addEventListener("load", () => {
    let scn = scene(0, 0, window.innerWidth, window.innerHeight);
    cube_space = cube(0, 0, 0, window.innerWidth, window.innerHeight, 1000, scn, "transparent");


    let cyl = cylinder(-10, window.innerHeight - 100, -400, 100, 550, cube_space.cube, "radial-gradient(#ffffff, #33aaff)");
    let ang = 0;
    cyl.object.style.transform = `rotateX(80deg) rotateZ(20deg)`;
    for (const side of cyl.side) {
        side.style.boxSizing = "unset";
        side.style.border = "3px solid #33aaff";
    }


    let cyl2 = cylinder(95, window.innerHeight + 90, -600, 120, 400, cube_space.cube, "linear-gradient(90deg, #00000000 50%, #00668833 50%)");
    cyl2.object.style.transform = `rotateX(80deg) rotateZ(20deg)`;
    cyl2.object.style.transformOrigin = `70px 0 0px`;
    for (const side of cyl2.side) {
        side.style.backgroundSize = "10% 100%";
        side.style.backgroundRepeat = "repeat";
        side.style.border = "10px solid #00668833";
    }


    let sides = [
        document.createElement("span"),
    ]

    sides[0].classList.add("cyl-side");
    cyl2.side[0].appendChild(sides[0]);
    sides[0].style.backgroundSize = `contain`;
    sides[0].style.backgroundRepeat = `no-repeat`;
    sides[0].style.backgroundPosition = `center`;
    sides[0].style.backgroundImage = `url("./assets/img1.png")`;


    let rc = 0;
    setInterval(() => {
        if (rc != ang / 60) {
            if (ang / 60 > rc) {
                ang -= 5;
            } else {
                ang += 5;
            }

            cyl2.object.style.transform = `rotateX(80deg) rotateZ(20deg) rotateY(${ang}deg)`;
        }
    }, 10);


    let screen = cube(100, 100, -300, window.innerWidth - 200, window.innerHeight - 200, 0, cube_space.cube, "radial-gradient(transparent, #00668833)")
    let screen_side = screen.side.front;
    let screen_back = screen.side.back;
    screen_back.style.border = "10px solid #00668833";
    screen_side.style.backgroundRepeat = "no-repeat";
    screen_side.style.backgroundSize = "contain";
    screen_side.style.backgroundPosition = "center";
    screen_side.style.backgroundImage = `url("./assets/img1.png")`;

    document.addEventListener("keydown", (evt) => {
        if (evt.keyCode == 69) {
            rc++;
        } else if (evt.keyCode == 81) {
            rc--;
        }

        if (evt.keyCode == 13) {
            open('https://discord.gg', "Discord", `height=${window.innerHeight},width=${window.innerWidth}`);
        }
    });
    // E - 69
    // Q = 81
});
