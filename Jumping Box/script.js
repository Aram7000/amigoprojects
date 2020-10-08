let startGame = false,
    date = (new Date()),
    dateNow = date.getMilliseconds(),
    coins,
    sc,
    hsc;


let gameOver = () => {
    if (inCollider(person.cube, spike1Cont) || inCollider(person.cube, spike2Cont)) {
        startGame = false;
        startBtn.cube.classList.remove("started");
        personParticles.off();
        coinParticles.off();
        if (hsc < Math.round(sc)) {
            hsc = Math.round(sc);
            hiScore.innerHTML = `High Score: ${hsc}`;
            window.localStorage.setItem("hsc", hsc);
        }
    }
}

let Update = () => {
    if (startGame) {
        personOBJ.parameters.jump();
        spike2.move();
        spike1.move();
        coin.move();
        if (gameSpeed > normalGameSpeed) {
            gameSpeed -= 1;
        } else {
            gameSpeed = normalGameSpeed;
        }
        gameOver();
        sc += gameSpeed / 500;
        score.innerHTML = `Score: ${Math.round(sc)}`
    }
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

    menuI[0].side.front.innerHTML += "SHOP";
    menuI[0].side.front.classList.add("menu-i-fr");
    menuI[0].object.classList.add("menu-i");
    menuI[0].cube.addEventListener("click", () => {
        window.location.href = "./shop.html";
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
    gameScene = container(0, 100, scene1);
    gameScene.classList.add("game-scene");
    personShadow = cube(window.innerWidth / 5, window.innerHeight / 2 - 1, -25, window.innerHeight / 10, 1, window.innerHeight / 10, gameScene)
    personParticles = particles(window.innerWidth / 5, window.innerHeight / 2 - 20, 50, "left", 100, 1, -50, gameScene);
    personParticles.off();

    coins = localStorage.getItem("coins") || 0;
    coinsCont = document.createElement("div");
    coinsCont.classList.add("coins");
    gameScene.appendChild(coinsCont);
    circle(
        0,
        0,
        0,
        window.innerHeight / 20,
        window.innerHeight / 20,
        coinsCont,
        "url('./assets/diamond.png') radial-gradient(#ffffff, transparent)",
        "image",
    );
    coinsCount = document.createElement("p");
    coinsCount.innerHTML = coins;
    coinsCont.appendChild(coinsCount);

    Continue1();
    way = cube(-window.innerWidth, window.innerHeight / 2, 0, window.innerWidth * 2.5 + 100, 30, 200, gameScene, "linear-gradient(45deg, #9900ff, #060606)")
    way.cube.classList.add("way-c");

    person = characters[parseInt(window.localStorage.getItem("activeCharacter")) || 0].object();
    gameScene.style.transform = `rotateY(0deg)`;
    startBtn = cube(window.innerWidth / 2 - 35, window.innerHeight / 3 - 35, 0, 70, 50, 20, scene1, "linear-gradient(135deg, #9900ff, #660044)")
    startBtn.object.classList.add("start-btn");
    startBtn.side.front.innerHTML = "START";
    startBtn.side.front.classList.add("start-fr");
    startBtn.cube.addEventListener("click", () => {
        startGame = true;
        normalGameSpeed = 7.5;
        gameSpeed = 7.5;
        spike1.reset();
        spike2.reset();
        coin.take();
        sc = 0;
        personParticles.on();
        startBtn.cube.classList.add("started");
    });

    hexC = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]
    personOBJ = characters[parseInt(window.localStorage.getItem("activeCharacter")) || 0];

    
    sc = 0;
    hsc = window.localStorage.getItem("hsc") || 0;
    score = document.createElement("p");
    score.classList.add("score");
    document.body.appendChild(score);
    score.innerHTML = "Score: 0";
    hiScore = document.createElement("p");
    hiScore.classList.add("hiScore");
    document.body.appendChild(hiScore);
    hiScore.innerHTML = `High Score: ${hsc}`;



    document.body.addEventListener("touchstart", () => {
        personOBJ.parameters.startJump();
    });
    document.body.addEventListener("keydown", (evt) => {
        if (evt.code == "Space") {
            personOBJ.parameters.startJump();
        }
    });

    gameSpeed = 16;
    normalGameSpeed = 16;

    spike1Cont = container(window.innerWidth / 2, window.innerHeight / 2 - window.innerHeight / 10, gameScene, 60, window.innerHeight / 10);
    spike1 = {
        x: window.innerWidth + (Math.random() * 1000),
        y: window.innerHeight / 2 - window.innerHeight / 10,
        wall: cube(40, 0, -25, 20, window.innerHeight / 10, window.innerHeight / 10, spike1Cont, "linear-gradient(45deg, #ff00ff, #6600ff)"),
        spike1: cube(0, 5, -window.innerHeight / 10 + 5, 40, 10, 10, spike1Cont, "linear-gradient(45deg, #ffffff, #666666)"),
        spike2: cube(0, 5, -30, 40, 10, 10, spike1Cont, "linear-gradient(45deg, #ffffff, #666666)"),
        move: () => {
            if (spike1.x < -100) {
                spike1.x = window.innerWidth + (Math.random() * 1000);
                normalGameSpeed += 0.1;
            }
            spike1.x -= gameSpeed;
            spike1Cont.style.left = `${spike1.x}px`;
        },
        reset: () => {
            spike1.x = window.innerWidth + (Math.random() * 1000)
            spike1.move();
        }
    }

    spike2Cont = container(window.innerWidth / 2, window.innerHeight / 2 - window.innerHeight / 10, gameScene, 60, window.innerHeight / 10);
    spike2 = {
        x: window.innerWidth + (Math.random() * 1000 + 1000),
        y: window.innerHeight / 2 - window.innerHeight / 10,
        wall: cube(40, 0, -25, 20, window.innerHeight / 10, window.innerHeight / 10, spike2Cont, "linear-gradient(45deg, #ff00ff, #6600ff)"),
        spike1: cube(0, 5, -window.innerHeight / 10 + 5, 40, 10, 10, spike2Cont, "linear-gradient(45deg, #ffffff, #666666)"),
        spike2: cube(0, 5, -30, 40, 10, 10, spike2Cont, "linear-gradient(45deg, #ffffff, #666666)"),
        move: () => {
            if (spike2.x < -100) {
                spike2.x = window.innerWidth + (Math.random() * 1000 + 1000);
            }
            spike2.x -= gameSpeed;
            spike2Cont.style.left = `${spike2.x}px`;
        },
        reset: () => {
            spike2.x = window.innerWidth + (Math.random() * 1000 + 1000)
            spike2.move();
        }
    }

    coin = {
        x: window.innerWidth + (Math.random() * 1000 + 1000),
        y: window.innerHeight / 2 - ((window.innerHeight / 10) * 2),
        powerUp: 0,
        rotateAng: 0,
        opacity: 1,
        taked: false,
        up: true,
        object: circle(
            window.innerWidth + (Math.random() * 1000 + 1000),
            window.innerHeight / 2 - ((window.innerHeight / 10) * 2),
            -50,
            window.innerHeight / 20,
            window.innerHeight / 20,
            gameScene,
            "url('./assets/diamond.png') radial-gradient(#ffffff, transparent)",
            "image",
        ),
        reset: () => {
            coin.x = window.innerWidth + (Math.random() * 1000 + 1000);
            coin.y = window.innerHeight / 2 - ((window.innerHeight / 10) * 2);
            coin.opacity = 1;
            coin.taked = false;
            coin.rotateAng = 0;
            coin.powerUp = 0;
            coinParticles.off();
        },
        move: () => {
            if (coin.x < -100) {
                coin.reset();
            }
            coin.x -= gameSpeed;
            coin.object.style.left = `${coin.x}px`;
            coin.object.style.transform = `translateZ(-50px) rotateY(${coin.rotateAng}deg)`;
            coin.rotateAng += 5;
            if (coin.rotateAng >= 360) {
                coin.rotateAng = 0;
            }
            if (!coin.taked) {
                if (Math.abs(coin.powerUp) >= 2) {
                    coin.up = !coin.up;
                }
                coin.powerUp += (coin.up) ? -0.1 : 0.1;
            } else {
                coin.opacity -= 0.05;
                coin.powerUp -= 0.5;
                if (coin.opacity < 0.2) {
                    coinParticles.off();
                }
            }
            coin.y -= coin.powerUp;
            coin.object.style.top = `${coin.y}px`;
            coin.object.style.opacity = coin.opacity;
            coin.take();
            coinParticles.cont.style.left = `${coin.x + (coin.object.offsetWidth / 2)}px`;
            coinParticles.cont.style.top = `${coin.y + coin.object.offsetHeight}px`;
        },
        take: () => {
            if (inCollider(coin.object, person.cube) && !coin.taked) {
                coin.taked = true;
                coin.powerUp = 10;
                coinParticles.on();
                coins++;
                window.localStorage.setItem("coins", coins);
                coinsCount.innerHTML = coins;
            }
        }
    }
    coinParticles = particles(coin.x, coin.y, 5, "bottom", 50, 1, -51, gameScene);
    coinParticles.off();
    Update();
}
