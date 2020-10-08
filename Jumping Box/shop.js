
let active;
let Update = () => {
    
    setTimeout(() => {
        Update();
    }, 1000 / 60);
}



let setup = () => {
    scene1 = scene(0, 0, window.innerWidth, window.innerHeight);
    scene1.style.background = `linear-gradient(#220044, #060606)`;
    header = cube(0, 0, 0, window.innerWidth, 100, 10, scene1, "#00000022")

    menuCont = container(10, 10, scene1);

    menuI = [
        cube(0, 0, -20, 80, 30, 10, menuCont, `linear-gradient(135deg, #9900ff, #660044)`),
        cube(0, 0, -20, 80, 30, 10, menuCont, `linear-gradient(135deg, #9900ff, #660044)`),
    ];

    menuI[0].side.front.innerHTML += "PLAY";
    menuI[0].side.front.classList.add("menu-i-fr");
    menuI[0].object.classList.add("menu-i");
    menuI[0].cube.addEventListener("click", () => {
        window.location.href = "./index.html";
    });


    menuI[1].side.front.innerHTML += "SETTINGS";
    menuI[1].side.front.classList.add("menu-i-fr");
    menuI[1].object.classList.add("menu-i");

    menuBtn = cube(0, 0, 0, 100, 50, 10, menuCont, `linear-gradient(135deg, #9900ff, #660044)`)
    menuBtn.side.front.classList.add("menu-i-btn");
    menuBtn.side.front.innerHTML += "MENU";
    menuOpened = false;
    menuCont.addEventListener("click", () => {
        if (!menuOpened) {
            menuBtn.object.classList.add("menuHover")
            menuBtn.object.classList.remove("menuOut")
            for (let i in menuI) {
                const element = menuI[i];
                element.cube.classList.add("menuOpened" + i);
                element.cube.classList.remove("menuClosed" + i);
            }
            menuOpened = true;
        } else {
            menuBtn.object.classList.add("menuOut")
            menuBtn.object.classList.remove("menuHover")
            for (let i in menuI) {
                const element = menuI[i];
                element.cube.classList.add("menuClosed" + i);
                element.cube.classList.remove("menuOpened" + i);
            }
            menuOpened = false;
        }
    });
    let index = parseInt(window.localStorage.getItem("activeCharacter")) || 0;
    gameScene = container(0, 100, scene1);
    gameScene.classList.add("game-scene");
    personShadow = cube(window.innerWidth / 5, window.innerHeight / 2 - 1, -25, window.innerHeight / 10, 1, window.innerHeight / 10, gameScene);
    personParticles = particles(window.innerWidth / 5, window.innerHeight / 2 - 20, 50, "left", 100, 1, -50, gameScene);
    personParticles.off();
    Continue1();
    active = characters[index].object();
    way = cube(-window.innerWidth, window.innerHeight / 2, 0, window.innerWidth * 2.5 + 100, 30, 200, gameScene, "linear-gradient(45deg, #9900ff, #060606)")
    way.cube.classList.add("way-c");

    let rightButton = cube(window.innerWidth - 80, 20, 0, 50, 100, 10, gameScene, `linear-gradient(45deg, #9900ff, #660044)`)
    rightButton.cube.classList.add("right-button");
    rightButton.side.front.innerHTML = "<span class='N_Arrow right'></span>"
    let leftButton = cube(window.innerWidth - 150, 20, 0, 50, 100, 10, gameScene, `linear-gradient(45deg, #9900ff, #660044)`)
    leftButton.cube.classList.add("left-button");
    leftButton.side.front.innerHTML = "<span class='N_Arrow left'></span>"
    leftButton.cube.addEventListener("click", () => {
        changeActive(-1);
    });
    rightButton.cube.addEventListener("click", () => {
        changeActive(1);
    });


    changeActive = (x) => {
        index += x;
        if (index > characters.length - 1) {
            index = 0;
        } else if (index < 0) {
            index = characters.length - 1;
        }

        active.cube.remove();
        active = characters[index].object();
    }

    let chooseBtn = cube(window.innerWidth - 150, 150, 0, 120, 50, 10, gameScene, "linear-gradient(45deg, #6600ff, #3300ff)");
    chooseBtn.cube.classList.add("choose-btn");
    chooseBtn.side.front.innerHTML = "<p class='choose-btn-p'>CHOOSE</p>";

    chooseBtn.cube.addEventListener("click", () => {
        localStorage.setItem("activeCharacter", index);
    });


    Update();
}