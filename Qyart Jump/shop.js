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


    if (localStorage.getItem("firstTime") == "true" || localStorage.getItem("firstTime") == null) {
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
        scores.arr[3] = localStorage.getItem("premiumtzbex");
        scores.ch(5);
    }

    let purchasedCharacters;
    if (localStorage.getItem("purchasedCharacters") == null) {
        localStorage.setItem("purchasedCharacters", "");
    } else {
        let txt = localStorage.getItem("purchasedCharacters").split(",");
        if (txt[0] == "") {
            purchasedCharacters = [];
        } else {
            purchasedCharacters = txt;
        }
    }

    let innerHTML = "";
    for (let i in characters) {
        const character = characters[i];
        shopI = `
            <div class="shop-i">
                <span class="item-i block" style="background-image: url('./img/${character.img}2.png')"></span>
                <div class="price-cont">
                    <p class="item-p">${character.price}</p>
                    <span class="block premiumtzbex-img"></span>
                </div>
            </div>
        `
        if (i % 2 == 0) {

            innerHTML += `
            <div class="flex row aic jca w100 p10">
                ${shopI}
                
                `;

        } else {
            innerHTML += `
                ${shopI}
            </div>
            `;
        }

    }
    document.querySelector(".shop-scene").innerHTML += innerHTML;

    let shopItems = document.querySelectorAll(".shop-i");
    for (let i = 0; i < shopItems.length; i++) {
        const item = shopItems[i];
        item.addEventListener("click", ()=>{
            purchase(i);
        });
    }

    let purchase = (i) => {
        if (scores.arr[3] >= characters[i].price) {

        } else {

        }
    }

});