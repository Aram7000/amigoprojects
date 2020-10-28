window.addEventListener("load", () => {




    let incollider = (object_1, object_2) => {
        let ax = object_1.offsetLeft;
        let ay = object_1.offsetTop;
        let aw = object_1.offsetWidth;
        let ah = object_1.offsetHeight;

        let bx = object_2.offsetLeft;
        let by = object_2.offsetTop;
        let bw = object_2.offsetWidth;
        let bh = object_2.offsetHeight;


        return (ax > (bx - aw) && ay > (by - ah) && ax < (bx + bw) && ay < (by + bh)) ? true : false;
    }

    let qyartSkills = {
        type: "Hopar",
    }

    let qyartLvls = [
        "Արա Էէէ",
        "Այ Տղա",
        "Ճուտ",
        "Եսիմ ով",
        "Տան Տղամարդ",
        "Պռոստո Ծանոթ",
        "Պաձյեզդի Ասող",
        "Շենքի Աֆտարիտետ",
        "Մեր Ախպեր",
        "Մայլի Տղա",
        "Ընգեր տղա",
        "Մայլի Աֆտարիտետ",
        "Լավ տղու նեղին հասնող",
        "Խարեբ",
        "Թաղը նայող",
        "Հարց լուծող",
        "Քաղաքի Ճշտի ղեկավար",
        "Քաղաքը նայող",
        "Բեսպրեդելշիկ",
        "Քյառթերի հայաստանի չեմպիոն",
        "Ստե սաղ քեզ գիտեն",
        "Հայաստանի աֆտարիտետ",
        "Հայաստանը նայող",
        "Բեզ պիծիմինուտ",
    ];

    let oneRound = {
        tzbex: 0,
        prtz: 0,
    }
    let play = false;

    let obj = {
        qyart: document.querySelector('#qyart'),
        platform: document.querySelectorAll('.platform'),
        tzbex: document.querySelector('#tzbex'),
        score: document.querySelectorAll('.score'),
        premiumTzbex: document.querySelector('#premiumtzbex'),
        bichok: document.querySelector('#bichok'),
        moxraman: document.querySelector('#moxraman'),
        progress: document.querySelector('#progress'),
        qyartlvl: document.querySelector("#qyart-lvl"),
    }

    let animation2_box;
    let animation2 = (object = obj.score[0], size = 5) => {
        clearInterval(animation2_box);
        let reached = false;
        let csize = size;
        animation2_box = setInterval(() => {

            if (!reached && csize <= size + 1) {
                csize += 0.1;
            } else {
                reached = true;
                csize -= 0.1;
            }
            object.style.cssText = `font-size: ${csize}vh`;
            if (csize <= size) {
                csize = size;
                object.style.cssText = `font-size: ${csize}vh`;
                clearInterval(animation2_box);
            }
        }, 1);
    }


    function lose() {
        let esc = document.querySelector(".e-score");
        esc.innerHTML = 0;
        play = false;
        qyart.left = 10;
        qyart.bottom = 1;
        scores.arr[5] += scores.arr[0];
        let s1 = scores.arr[0];
        document.querySelector(".loseScreen").classList.add("active");
        let animation3 = setInterval(() => {
            if (esc.innerHTML < s1) {
                esc.innerHTML = parseInt(esc.innerHTML) + 1;
            } else {
                clearInterval(animation3);
            }
        }, 10);
        document.querySelector(".e-tzbex p").innerHTML = ": " + oneRound.tzbex;
        document.querySelector(".e-prtz p").innerHTML = ": " + oneRound.prtz;
        scores.arr[0] = 0;
        scores.ch(6);
        moxraman.life = 0;
        moxraman.rm();
        w3 = w2;
        w1 = Math.floor(scores.arr[5] / 100);
        w2 = scores.arr[5] - (w1 * 100);
        w4 = (w2 < w3) ? 100 + w2 : w2;
        if (scores.arr[2] < scores.arr[0]) {
            scores.arr[2] = scores.arr[0];
        }
        let animation1 = setInterval(() => {
            if (w3 <= w4) {
                if (w3 >= 100) {
                    w3 = 0;
                    w4 -= 100;
                }
                w3 += 0.075;
                obj.progress.style.width = w3 + "%";
            } else {
                obj.progress.style.width = w2 + "%";
                clearInterval(animation1);
            }
        }, 1);

        if (w1 >= qyartLvls.length - 1) {
            w1 = qyartLvls.length - 1;
        }
        obj.qyartlvl.innerHTML = qyartLvls[w1];
        oneRound.tzbex = 0;
        oneRound.prtz = 0;
        
    }

    let scores = {
        arr: [0, 0, 0, 0, 0, 0, 0],
        //score: 0
        //tzbexscore: 1
        //hiscore: 2
        //premiumtzbexscore: 3
        //moxraman: 4
        //progress: 5
        //ankap ban: 6

        ch: (a) => {
            scores.arr[a]++;
            obj.score[0].innerText = scores.arr[0];
            localStorage.setItem("tzbex", scores.arr[1]);
            localStorage.setItem("hiscore", scores.arr[2]);
            localStorage.setItem("premiumtzbex", scores.arr[3]);
            localStorage.setItem("progress", scores.arr[5]);
            if (scores.arr[0] >= 50) {
                platforms.img = "niva.png";
            } else {
                platforms.img = "lada.png";
            }
        },
    }

    platforms = {
        img: "lada.png",
        pos: [{ x: 0, y: 0 }, { x: 0, y: 0 }],
        cd: (a) => {
            platforms.pos[a].x = Math.round(((Math.random() * 60) / 17)) * 17;
            platforms.pos[a].y = Math.round(((Math.random() * 35 + 20) / 10)) * 10;

            if (platforms.pos[0].x == platforms.pos[1].x && platforms.pos[0].y == platforms.pos[1].y) {
                platforms.cd(a);
            } else {
                obj.platform[a].style.left = platforms.pos[a].x + "%";
                obj.platform[a].style.bottom = platforms.pos[a].y + "%";
                obj.platform[a].style.backgroundImage = `url("./img/${platforms.img}")`;
            }
        },
    }

    if (localStorage.getItem("firstTime") == "true") {
        localStorage.setItem("firstTime", "false");
        localStorage.setItem("score", 0);
        localStorage.setItem("hiscore", 0);
        localStorage.setItem("tzbex", 0);
        localStorage.setItem("premiumtzbex", 0);
        localStorage.setItem("progress", 0);
    } else {
        scores.arr[0] = 0;
        scores.arr[1] = localStorage.getItem("tzbex");
        scores.arr[2] = localStorage.getItem("hiscore");
        scores.arr[3] = localStorage.getItem("premiumtzbex");
        scores.arr[5] = parseInt(localStorage.getItem("progress"));
        scores.ch(6);
    }




    bichok = {
        x: 5,
        y: 0,

        fall: () => {
            if (play) {
                if (bichok.y > 0) {
                    bichok.y -= 0.75;
                } else {
                    bichok.y = 100;
                    bichok.x = Math.round(Math.random() * (100 - (100 / obj.bichok.offsetWidth)));
                    obj.bichok.style.left = bichok.x + "%";
                }
            } else {
                bichok.y = -100;
            }
            obj.bichok.style.bottom = bichok.y + "%";
        }
    }

    moxraman = {
        is: false,
        x: null,
        y: null,
        caught: false,
        life: 0,

        cr: () => {
            if (!moxraman.caught && play && Math.round(Math.random() * 6) == 5) {
                moxraman.x = Math.round(((Math.random() * 68) / 17)) * 17;
                moxraman.y = Math.round(((Math.random() * 45 + 13) / 10)) * 10;
                moxraman.is = true;

                obj.moxraman.style.left = moxraman.x + "%";
                obj.moxraman.style.bottom = moxraman.y + "%";
                obj.moxraman.style.backgroundImage = 'url("./img/moxraman.png")';
            }
            if (moxraman.is) {
                moxraman.protect();
            }
        },
        rm: () => {
            if (moxraman.life <= 0) {
                moxraman.caught = false;
                moxraman.is = false;
                obj.moxraman.style.backgroundImage = 'none';
            }
        },
        protect: () => {
            bichok.fall();
            if (play && moxraman.caught) {
                moxraman.x = qyart.left;
                moxraman.y = qyart.bottom + 9;
                obj.moxraman.style.left = moxraman.x + "%";
                obj.moxraman.style.bottom = moxraman.y + "%";
            }
        }
    }

    tzbex = {
        x: 0,
        y: 0,
        cd: () => {
            tzbex.x = Math.round(((Math.random() * 68) / 17)) * 17;
            tzbex.y = Math.round(((Math.random() * 35 + 13) / 10)) * 10;

            obj.tzbex.style.left = tzbex.x + "%";
            obj.tzbex.style.bottom = tzbex.y + "%";
        },
    }

    premiumTzbex = {
        is: false,
        x: null,
        y: null,

        cr: () => {
            if (scores.arr[0] >= 50 && Math.round(Math.random() * 10) == 5) {
                premiumTzbex.x = Math.round(((Math.random() * 68) / 17)) * 17;
                premiumTzbex.y = Math.round(((Math.random() * 35 + 13) / 10)) * 10;
                premiumTzbex.is = true;

                obj.premiumTzbex.style.left = premiumTzbex.x + "%";
                obj.premiumTzbex.style.bottom = premiumTzbex.y + "%";
                obj.premiumTzbex.style.backgroundImage = 'url("./img/premiumtzbex.png")';
            }
        },
        rm: () => {
            premiumTzbex.is = false;
            obj.premiumTzbex.style.backgroundImage = 'none';
        }
    }



    qyart = {
        speedX: 0,
        speedY: 0,
        left: 20,
        bottom: 0,
        double: true,
        jumping: false,
        touch: () => {
            if (play) {
                if (incollider(obj.qyart, obj.bichok)) {
                    if (!moxraman.caught) {
                        lose();
                    } else {
                        moxraman.life--;
                        moxraman.rm();
                        bichok.y = 100;
                        bichok.x = Math.round(Math.random() * 90 + 5);
                        obj.bichok.style.left = bichok.x + "%";
                    }
                }
                if (moxraman.is && !moxraman.caught && incollider(obj.moxraman, obj.qyart)) {
                    moxraman.caught = true;
                    moxraman.life = 3;
                }
                if (incollider(obj.qyart, obj.tzbex)) {
                    tzbex.cd();
                    scores.ch(1);
                    oneRound.tzbex++;
                }
                if (premiumTzbex.is && incollider(obj.premiumTzbex, obj.qyart)) {
                    premiumTzbex.rm();
                    scores.ch(3);
                    oneRound.prtz++;
                }
            }
            if (qyart.speedY <= 0) {
                for (let i = 0; i < obj.platform.length; i++) {
                    if (incollider(obj.qyart, obj.platform[i])) {
                        qyart.double = true;
                        qyart.speedY = 20;
                        platforms.cd(i);
                        scores.score++;
                        animation2();
                        scores.ch(0);
                        play = true;
                        break;
                    }
                }
            }
        },
        move: () => {
            if (qyart.left >= 90) {
                qyart.left = -10;
            }
            else if (qyart.left <= -11) {
                qyart.left = 89;
            }
            qyart.left += qyart.speedX;
            obj.qyart.style.left = Math.round(qyart.left) + "%";


            qyart.touch();
            if (qyart.jumping) {
                qyart.bottom += qyart.speedY / 10;
                qyart.speedY -= 1;
            }
            if (qyart.bottom < 0 && qyart.jumping) {
                qyart.bottom = 0;
                qyart.speedY = 0;
                qyart.jumping = false;
            }
            if (qyart.bottom > 85) {
                qyart.speedY = -10;
            }
            if (qyart.bottom <= 0) {
                lose();
            }
            obj.qyart.style.bottom = qyart.bottom + "%";
            moxraman.protect();
        },
        jumpStartPosition: 0,
        jump: () => {
            if (!play || qyart.double) {
                qyart.speedY = 25;
                qyart.jumping = true;
                qyart.double = false;
            }
        },
        touchStart: (s) => {
            qyart.speedX = s;
            obj.qyart.style.backgroundImage = `url("./img/anime-qyart${(s > 0) ? "2" : "-2"}.png")`
        },
        touchEnd: () => {
            qyart.speedX = 0;
        },
    }

    document.body.addEventListener("keydown", (evt) => {
        if (evt.keyCode == 37) {
            qyart.speedX = -2;
            obj.qyart.style.backgroundImage = 'url("./img/anime-qyart-2.png")';
        } else if (evt.keyCode == 39) {
            qyart.speedX = 2;
            obj.qyart.style.backgroundImage = 'url("./img/anime-qyart2.png")';
        } else if (evt.keyCode == 32) {
            qyart.jump();
        }
    });
    document.body.addEventListener("keyup", (evt) => {
        if (evt.keyCode == 37 || evt.keyCode == 39) {
            qyart.speedX = 0;
        }
    });

    document.querySelector("footer").addEventListener("touchstart", (evt) => {
        let speed = (evt.touches[0].pageX - window.innerWidth / 2) / (window.innerWidth / 2);
        qyart.touchStart(speed * 3);
    });
    document.querySelector("footer").addEventListener("touchmove", (evt) => {
        let speed = (evt.touches[0].pageX - window.innerWidth / 2) / (window.innerWidth / 2);
        qyart.touchStart(speed * 3);
        if (evt.touches[0].pageY < (window.innerHeight / 3) * 2) {
            qyart.jump();
        }
    });
    document.querySelector("footer").addEventListener("touchend", (evt) => {
        qyart.touchEnd();
    });

    document.querySelector(".play-again").addEventListener("click", () => {
        document.querySelector(".loseScreen").classList.remove("active");
    });

    platforms.cd(0);
    platforms.cd(1);
    tzbex.cd();


    setInterval(premiumTzbex.cr, 5000);
    setInterval(moxraman.cr, 2000);
    setInterval(qyart.move, 15);


    let w1 = Math.floor(scores.arr[5] / 100);
    let w2 = scores.arr[5] - (w1 * 100);
    let w3 = w2;
    if (scores.arr[2] < scores.arr[0]) {
        scores.arr[2] = scores.arr[0];
    }
    obj.progress.style.width = w2 + "%";

    setTimeout(() => {
        document.querySelector(".loseScreen").classList.remove("active");
        document.querySelector("#NEON_loading").classList.add("fadeOut");
    }, 50);


});
