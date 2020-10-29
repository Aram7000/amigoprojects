window.addEventListener("load", () => {
    let obj = {
        score: document.querySelectorAll(".score"),
        progress: document.querySelector('#progress'),
        qyartlvl: document.querySelector("#qyart-lvl"),
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
        },
    }

    if (localStorage.getItem("firstTime") == "true" || localStorage.getItem("firstTime") == null) {
        localStorage.setItem("firstTime", "false");
        localStorage.setItem("score", 0);
        localStorage.setItem("hiscore", 0);
        localStorage.setItem("tzbex", 0);
        localStorage.setItem("premiumtzbex", 0);
    } else {
        scores.arr[0] = 0;
        scores.arr[1] = localStorage.getItem("tzbex");
        scores.arr[2] = localStorage.getItem("hiscore");
        scores.arr[3] = localStorage.getItem("premiumtzbex");
        scores.arr[5] = localStorage.getItem("progress");
        scores.ch(6);
    }


    let w1 = Math.floor(scores.arr[5] / 100);
    let w2 = scores.arr[5] - (w1 * 100);
    if (scores.arr[2] < scores.arr[0]) {
        scores.arr[2] = scores.arr[0];
    }
    obj.progress.style.width = w2 + "%";
    if (w1 >= qyartLvls.length - 1) {
        w1 = qyartLvls.length - 1;
    }
    obj.qyartlvl.innerHTML = qyartLvls[w1];


    obj.score[0].innerHTML = "Score: " + scores.arr[0];
    obj.score[1].innerHTML = ": " + scores.arr[1];
    obj.score[2].innerHTML = "High Score: " + scores.arr[2];
    obj.score[3].innerHTML = ": " + scores.arr[3];



});