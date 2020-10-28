window.addEventListener("load", () => {
    obj = {
        score: document.getElementsByClassName('score'),
    }

    scores = {
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


    if (localStorage.getItem("firstTime") == "true") {
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

    items = [
        {
            name: "Ջահել",
            priceType: "tzbex",
            price: 100,
            img: "qyart",
        },
    ];

    for (let i in items) {
        document.querySelector(".shop-scene").innerHTML += `
            <div class="shop-i">
                <span class="item-i" style="background-image: url('./img/${items[i].img}2.png')"></span>
                <div class="price-cont">


                </div>
            </div>
        
        `;

    }



    buy = (a) => {
        let tzbex = scores.arr[1];
        let premiumTzbex = scores.arr[3];
        
        if (tzbex >= items[a].price) {
            scores.arr[1] -= items[a].price;
            scores.ch(5);
        }
    }
});