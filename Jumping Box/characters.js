let characters;
let Continue1 = () => {
    characters = [
        {
            name: "Standart",
            object: () => {
                return cube(window.innerWidth / 5, window.innerHeight / 2 - window.innerHeight / 10 - 1, -25, window.innerHeight / 10, window.innerHeight / 10, window.innerHeight / 10, gameScene, "radial-gradient(#ffffff, #6600ff)");
            },
            parameters: {
                jumping: false,
                doubleJump: true,
                gravitation: 3,
                jumpPower: 40,
                powerUp: 0,
                rotate: 0,
                x: 50,
                y: window.innerHeight / 2 - window.innerHeight / 10,
                jump: () => {
                    personOBJ.parameters.y -= personOBJ.parameters.powerUp;
                    personOBJ.parameters.powerUp -= personOBJ.parameters.gravitation;
                    person.cube.style.top = `${personOBJ.parameters.y}px`;
                    cy = (window.innerHeight / 2 - window.innerHeight / 10) - personOBJ.parameters.y;
                    hex = Math.floor(((cy + 1) / (window.innerHeight / 2 - window.innerHeight / 10)) * 10) + 3;
                    hex = hexC.length - ((hex < 0) ? 0 : hex);
                    hex = `#000000${hexC[hex]}${hexC[hex]}`;
                    personShadow.side.top.style.background = `radial-gradient(${hex}, transparent)`;
                    person.cube.style.transform = `rotateZ(${personOBJ.parameters.rotate}deg) translateZ(-25px)`;
                    personOBJ.parameters.rotate += (180 / ((personOBJ.parameters.jumpPower / personOBJ.parameters.gravitation) * 2));
                    if (personOBJ.parameters.rotate >= 360) {
                        personOBJ.parameters.rotate = 0;
                    }
                    if (personOBJ.parameters.y >= window.innerHeight / 2 - window.innerHeight / 10) {
                        personOBJ.parameters.powerUp = 0;
                        personOBJ.parameters.y = window.innerHeight / 2 - window.innerHeight / 10;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                        personOBJ.parameters.jumping = false;
                        personOBJ.parameters.doubleJump = true;
                        personOBJ.parameters.rotate = 0;
                        personParticles.on();
                    } else if (personOBJ.parameters.y <= 0) {
                        personOBJ.parameters.powerUp = -0.1;
                        personOBJ.parameters.y = 0;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                    }
                },
                startJump: () => {
                    if (startGame) {
                        if (!personOBJ.parameters.jumping) {
                            personParticles.off();
                            personOBJ.parameters.powerUp = personOBJ.parameters.jumpPower;
                            personOBJ.parameters.jumping = true;
                        } else {
                            if (personOBJ.parameters.doubleJump) {
                                gameSpeed += 22;
                                personOBJ.parameters.doubleJump = false;
                            }
                        }
                    }
                }
            }
        },
        {
            name: "Spirit",
            object: () => {
                return cube(window.innerWidth / 5, window.innerHeight / 2 - window.innerHeight / 10 - 1, -25, window.innerHeight / 10, window.innerHeight / 10, window.innerHeight / 10, gameScene, "radial-gradient(#ffffff00, #ffffff22)");
            },
            parameters: {
                jumping: false,
                doubleJump: true,
                gravitation: 3,
                jumpPower: 40,
                powerUp: 0,
                rotate: 0,
                x: 50,
                y: window.innerHeight / 2 - window.innerHeight / 10,
                jump: () => {
                    personOBJ.parameters.y -= personOBJ.parameters.powerUp;
                    personOBJ.parameters.powerUp -= personOBJ.parameters.gravitation;
                    person.cube.style.top = `${personOBJ.parameters.y}px`;
                    cy = (window.innerHeight / 2 - window.innerHeight / 10) - personOBJ.parameters.y;
                    hex = Math.floor(((cy + 1) / (window.innerHeight / 2 - window.innerHeight / 10)) * 10) + 3;
                    hex = hexC.length - ((hex < 0) ? 0 : hex);
                    hex = `#000000${hexC[hex]}${hexC[hex]}`;
                    personShadow.side.top.style.background = `radial-gradient(${hex}, transparent)`;
                    person.cube.style.transform = `rotateZ(${personOBJ.parameters.rotate}deg) translateZ(-25px)`;
                    personOBJ.parameters.rotate += (180 / ((personOBJ.parameters.jumpPower / personOBJ.parameters.gravitation) * 2));
                    if (personOBJ.parameters.rotate >= 360) {
                        personOBJ.parameters.rotate = 0;
                    }
                    if (personOBJ.parameters.y >= window.innerHeight / 2 - window.innerHeight / 10) {
                        personOBJ.parameters.powerUp = 0;
                        personOBJ.parameters.y = window.innerHeight / 2 - window.innerHeight / 10;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                        personOBJ.parameters.jumping = false;
                        personOBJ.parameters.doubleJump = true;
                        personOBJ.parameters.rotate = 0;
                        personParticles.on();
                    } else if (personOBJ.parameters.y <= 0) {
                        personOBJ.parameters.powerUp = -0.1;
                        personOBJ.parameters.y = 0;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                    }
                },
                startJump: () => {
                    if (startGame) {
                        if (!personOBJ.parameters.jumping) {
                            personParticles.off();
                            personOBJ.parameters.powerUp = personOBJ.parameters.jumpPower;
                            personOBJ.parameters.jumping = true;
                        } else {
                            if (personOBJ.parameters.doubleJump) {
                                gameSpeed += 22;
                                personOBJ.parameters.doubleJump = false;
                            }
                        }
                    }
                }
            }
        },
        {
            name: "Type 3",
            object: () => {
                let x = cube(window.innerWidth / 5, window.innerHeight / 2 - window.innerHeight / 10 - 1, -25, window.innerHeight / 10, window.innerHeight / 10, window.innerHeight / 10, gameScene, "transparent");
                cube(0, 0, 0, (window.innerHeight / 10) / 5 * 2, (window.innerHeight / 10) / 5, window.innerHeight / 10, x.cube, "radial-gradient(#ff00ff, #6600ff)")
                cube((window.innerHeight / 10) / 5 * 3, 0, 0, (window.innerHeight / 10) / 5 * 2, (window.innerHeight / 10) / 5, window.innerHeight / 10, x.cube, "radial-gradient(#ff00ff, #6600ff)")
                cube(0, (window.innerHeight / 10) / 5 * 2, 0, window.innerHeight / 10, (window.innerHeight / 10) / 5, window.innerHeight / 10, x.cube, "radial-gradient(#ff00ff, #6600ff)")
                cube(0, (window.innerHeight / 10) / 5 * 4, 0, (window.innerHeight / 10) / 5 * 2, (window.innerHeight / 10) / 5, window.innerHeight / 10, x.cube, "radial-gradient(#ff00ff, #6600ff)")
                cube((window.innerHeight / 10) / 5 * 3, (window.innerHeight / 10) / 5 * 4, 0, (window.innerHeight / 10) / 5 * 2, (window.innerHeight / 10) / 5, window.innerHeight / 10, x.cube, "radial-gradient(#ff00ff, #6600ff)")
                return x;
            },
            parameters: {
                jumping: false,
                doubleJump: true,
                gravitation: 3,
                jumpPower: 40,
                powerUp: 0,
                rotate: 0,
                x: 50,
                y: window.innerHeight / 2 - window.innerHeight / 10,
                jump: () => {
                    personOBJ.parameters.y -= personOBJ.parameters.powerUp;
                    personOBJ.parameters.powerUp -= personOBJ.parameters.gravitation;
                    person.cube.style.top = `${personOBJ.parameters.y}px`;
                    cy = (window.innerHeight / 2 - window.innerHeight / 10) - personOBJ.parameters.y;
                    hex = Math.floor(((cy + 1) / (window.innerHeight / 2 - window.innerHeight / 10)) * 10) + 3;
                    hex = hexC.length - ((hex < 0) ? 0 : hex);
                    hex = `#000000${hexC[hex]}${hexC[hex]}`;
                    personShadow.side.top.style.background = `radial-gradient(${hex}, transparent)`;
                    person.cube.style.transform = `rotateZ(${personOBJ.parameters.rotate}deg) translateZ(-25px)`;
                    personOBJ.parameters.rotate += (180 / ((personOBJ.parameters.jumpPower / personOBJ.parameters.gravitation) * 2));
                    if (personOBJ.parameters.rotate >= 360) {
                        personOBJ.parameters.rotate = 0;
                    }
                    if (personOBJ.parameters.y >= window.innerHeight / 2 - window.innerHeight / 10) {
                        personOBJ.parameters.powerUp = 0;
                        personOBJ.parameters.y = window.innerHeight / 2 - window.innerHeight / 10;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                        personOBJ.parameters.jumping = false;
                        personOBJ.parameters.doubleJump = true;
                        personOBJ.parameters.rotate = 0;
                        personParticles.on();
                    } else if (personOBJ.parameters.y <= 0) {
                        personOBJ.parameters.powerUp = -0.1;
                        personOBJ.parameters.y = 0;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                    }
                },
                startJump: () => {
                    if (startGame) {
                        if (!personOBJ.parameters.jumping) {
                            personParticles.off();
                            personOBJ.parameters.powerUp = personOBJ.parameters.jumpPower;
                            personOBJ.parameters.jumping = true;
                        } else {
                            if (personOBJ.parameters.doubleJump) {
                                gameSpeed += 22;
                                personOBJ.parameters.doubleJump = false;
                            }
                        }
                    }
                }
            }
        },
        {
            name: "Rocket",
            object: () => {
                let x = cube(
                    window.innerWidth / 5,
                    window.innerHeight / 2 - window.innerHeight / 9 - 1,
                    -25,
                    (window.innerHeight / 10) / 2,
                    window.innerHeight / 10,
                    (window.innerHeight / 10) / 2,
                    gameScene,
                    "transparent"
                );
                let xyz = (window.innerHeight / 9) / 5;
                cube(
                    (xyz * 5 - (xyz * 2.6)) / 4,
                    0,
                    -(xyz * 5 - (xyz * 2.6)) / 4,
                    xyz * 2.6 / 2,
                    xyz,
                    xyz * 2.6 / 2,
                    x.cube,
                    "linear-gradient(#cccccc, #ffffff)"
                )
                cube(
                    (xyz * 5 - (xyz * 3.4)) / 4,
                    xyz * 1,
                    -(xyz * 5 - (xyz * 3.4)) / 4,
                    xyz * 3.4 / 2,
                    xyz,
                    xyz * 3.4 / 2,
                    x.cube,
                    "linear-gradient(#888888, #cccccc)"
                )
                cube(
                    (xyz * 5 - (xyz * 4.2)) / 4,
                    xyz * 2,
                    -(xyz * 5 - (xyz * 4.2)) / 4,
                    xyz * 4.2 / 2,
                    xyz,
                    xyz * 4.2 / 2,
                    x.cube,
                    "linear-gradient(#555555, #888888)"
                )
                let last = cube(
                    0,
                    xyz * 3,
                    0,
                    xyz * 5 / 2,
                    xyz,
                    xyz * 5 / 2,
                    x.cube,
                    "linear-gradient(#333333, #555555)"
                )
                last.side.bottom.style.backgroundImage = "radial-gradient(#ffff00 0%, #ff5500 40%, #331100 50%, #333333 100%)";
                x.cube.style.transform = `rotateZ(10deg) translateZ(-25px)`;
                passiveParticles = particles((
                    window.innerHeight / 10) / 4,
                    (window.innerHeight / 10) / 5 * 3.5,
                    10,
                    "bottom",
                    30,
                    1,
                    -(window.innerHeight / 10) / 4,
                    x.cube,
                    "#ff5500"
                );
                personParticles.cont.remove();
                personParticles = particles((
                    window.innerHeight / 10) / 4,
                    (window.innerHeight / 10) / 2,
                    50,
                    "bottom",
                    100,
                    0.5,
                    -(window.innerHeight / 10) / 4,
                    x.cube,
                    "#ff5500"
                );
                personParticles.off();
                personShadow.cube.remove();
                personShadow = cube(
                    window.innerWidth / 5 - 20,
                    window.innerHeight / 2 - 1,
                    -25,
                    window.innerHeight / 20 + 10,
                    1,
                    window.innerHeight / 20,
                    gameScene
                );
                
                return x;
            },
            parameters: {
                jumping: false,
                doubleJump: true,
                gravitation: 0.5,
                jumpPower: 25,
                powerUp: 0,
                rotate: 10,
                rotatePower: 0,
                x: 50,
                y: window.innerHeight / 2 - window.innerHeight / 9,
                jump: () => {
                    personOBJ.parameters.y -= personOBJ.parameters.powerUp;
                    personOBJ.parameters.powerUp -= personOBJ.parameters.gravitation;
                    personOBJ.parameters.powerUp -= personOBJ.parameters.gravitation;
                    person.cube.style.top = `${personOBJ.parameters.y}px`;
                    cy = (window.innerHeight / 2 - window.innerHeight / 9) - personOBJ.parameters.y;
                    hex = Math.floor(((cy + 1) / (window.innerHeight / 2 - window.innerHeight / 9)) * 10) + 3;
                    hex = hexC.length - ((hex < 0) ? 0 : hex);
                    anHex = `#ffaa00${hexC[hex - 2]}${hexC[hex - 2]}`;
                    hex = `#ffff00${hexC[hex]}${hexC[hex]}`;
                    person.cube.style.transform = `rotateZ(${personOBJ.parameters.rotate}deg) translateZ(-25px)`
                    personShadow.side.top.style.backgroundImage = `radial-gradient(${hex}, ${anHex}, transparent, transparent)`;
                    personOBJ.parameters.rotate += personOBJ.parameters.rotatePower;

                    if (personOBJ.parameters.powerUp <= 0) {
                        personParticles.off();
                    }

                    if (personOBJ.parameters.y >= window.innerHeight / 2 - window.innerHeight / 9) {
                        personOBJ.parameters.powerUp = 0;
                        personOBJ.parameters.y = window.innerHeight / 2 - window.innerHeight / 9;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                        personOBJ.parameters.jumping = false;
                        personOBJ.parameters.doubleJump = true;
                        personOBJ.parameters.rotate = 10;
                    } else if (personOBJ.parameters.y <= 0) {
                        personOBJ.parameters.powerUp = -0.1;
                        personOBJ.parameters.rotatePower = -0.1;
                        personOBJ.parameters.y = 0;
                        person.cube.style.top = `${personOBJ.parameters.y}px`;
                    }
                },
                startJump: () => {
                    if (startGame) {
                        if (!personOBJ.parameters.jumping) {
                            personParticles.on();
                            personOBJ.parameters.powerUp = personOBJ.parameters.jumpPower;
                            personOBJ.parameters.jumping = true;
                        } else {
                            if (personOBJ.parameters.doubleJump) {
                                gameSpeed += 25;
                                personOBJ.parameters.doubleJump = false;
                            }
                        }
                    }
                }
            },
        }
    ]
}