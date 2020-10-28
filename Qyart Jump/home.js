window.addEventListener("load", () => {
    let obj = {
        score: document.getElementsByClassName('score'),
    }
    
    let scores = {
        arr: [0, 0, 0, 0, 0, 0],
        //score: 0
        //tzbexscore: 1
        //hiscore: 2
        //premiumtzbexscore: 3
        //moxraman: 4
        //ankap ban: 5
    
        ch: (a) => {
            scores.arr[a]++;
            obj.score[0].innerText = "Score: " + scores.arr[0];
            obj.score[1].innerText = ": " + scores.arr[1];
            obj.score[2].innerText = "High Score: " + scores.arr[2];
            obj.score[3].innerText = ": " + scores.arr[3];
            localStorage.setItem("tzbex", scores.arr[1]);
            localStorage.setItem("hiscore", scores.arr[2]);
            localStorage.setItem("premiumtzbex", scores.arr[3]);
        },
    }
    
    
    
    
    if(localStorage.getItem("firstTime") == "true") {
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
        scores.ch(5);
    }
});