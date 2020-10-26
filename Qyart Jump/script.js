window.addEventListener("load", () => {

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
    ]

    let ActiveLvl = qyartLvls[0];

    let play = false;

    let obj = {
        qyart: document.getElementById('qyart'),
        platform: document.getElementsByClassName('platform'),
        tzbex: document.getElementById('tzbex'),
        score: document.getElementsByClassName('score'),
        premiumTzbex: document.getElementById('premiumtzbex'),
        bichok: document.getElementById('bichok'),
        moxraman: document.getElementById('moxraman'),
        progress: document.getElementById('progress'),
        qyartlvl: document.getElementById("qyart-lvl"),
    }

    function lose() {
        play = false;
        qyart.left = 10;
        qyart.bottom = 1;
        scores.arr[5] += scores.arr[0];
        let w1 = Math.floor(scores.arr[5] / 100);
        let w2 = scores.arr[5] - (w1 * 100);
        if (scores.arr[2] < scores.arr[0]) {
            scores.arr[2] = scores.arr[0];
        }
        scores.arr[0] = 0;
        scores.ch(6);
        moxraman.life = 0;
        moxraman.rm();

        obj.progress.style.width = w2 + "%";

        if (w1 >= qyartLvls.length - 1) {
            w1 = qyartLvls.length - 1;
        }
        obj.qyartlvl.innerHTML = qyartLvls[w1];
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
            obj.score[0].innerText = "Score: " + scores.arr[0];
            obj.score[1].innerText = ": " + scores.arr[1];
            obj.score[2].innerText = "High Score: " + scores.arr[2];
            obj.score[3].innerText = ": " + scores.arr[3];
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
                    bichok.y -= 0.5;
                } else {
                    bichok.y = 100;
                    bichok.x = Math.round(Math.random() * 60);
                    obj.bichok.style.left = bichok.x + "%";
                }
            } else {
                bichok.y = 0;
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
                if (qyart.left >= bichok.x - 15 && qyart.left <= bichok.x + 5 && qyart.bottom <= bichok.y + 5 && qyart.bottom >= bichok.y) {
                    if (!moxraman.caught) {
                        lose();
                    } else {
                        moxraman.life--;
                        moxraman.rm();
                        bichok.y = 80;
                        bichok.x = Math.round(Math.random() * 90 + 5);
                        obj.bichok.style.left = bichok.x + "%";
                    }
                }
                if (moxraman.is && !moxraman.caught && qyart.left >= moxraman.x - 15 && qyart.left <= moxraman.x + 12 && qyart.bottom <= moxraman.y + 8 && qyart.bottom >= moxraman.y) {
                    moxraman.caught = true;
                    moxraman.life = 3;
                }
                if (qyart.left >= tzbex.x - 15 && qyart.left <= tzbex.x + 15 && qyart.bottom <= tzbex.y + 5 && qyart.bottom >= tzbex.y) {
                    tzbex.cd();
                    scores.ch(1);
                }
                if (premiumTzbex.is && qyart.left >= premiumTzbex.x - 15 && qyart.left <= premiumTzbex.x + 15 && qyart.bottom <= premiumTzbex.y + 5 && qyart.bottom >= premiumTzbex.y) {
                    premiumTzbex.rm();
                    scores.ch(3);
                }
            }
            for (let i = 0; i < 2; i++) {
                if (qyart.left >= platforms.pos[i].x - 15 && qyart.left <= platforms.pos[i].x + 17 && qyart.bottom <= platforms.pos[i].y + 5 && qyart.bottom >= platforms.pos[i].y) {
                    qyart.speedY = 20;
                    platforms.cd(i);
                    scores.score++;
                    scores.ch(0);
                    play = true;
                    qyart.double = true;
                    break;
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
            obj.qyart.style.backgroundImage = `url("./img/qyart${(s > 0) ? "2" : "-2"}.png")`
        },
        touchEnd: () => {
            qyart.speedX = 0;
        },
    }

    document.body.addEventListener("keydown", (evt) => {
        if (evt.keyCode == 37) {
            qyart.speedX = -2;
            obj.qyart.style.backgroundImage = 'url("./img/qyart-2.png")';
        } else if (evt.keyCode == 39) {
            qyart.speedX = 2;
            obj.qyart.style.backgroundImage = 'url("./img/qyart2.png")';
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




    platforms.cd(0);
    platforms.cd(1);
    tzbex.cd();

    setInterval(bichok.fall, 10);
    setInterval(premiumTzbex.cr, 5000);
    setInterval(moxraman.cr, 2000);
    setInterval(moxraman.protect, 10);
    setInterval(qyart.move, 15);



});
