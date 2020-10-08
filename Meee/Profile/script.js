window.addEventListener("load", () => {
    n_onload();
    let inStr = (str1, str2) => {
        return (str2.replace(str1, "") != str2) ? true : false;
    }

    let menuActive = false;
    let menuButton = document.querySelector("button#menu");
    let menu = document.querySelector("menu#profile")
    menuButton.addEventListener("click", () => {
        menuButton.classList.remove("active" + menuActive);
        menu.classList.remove("active" + menuActive);
        menuActive = !menuActive;
        menuButton.classList.add("active" + menuActive);
        menu.classList.add("active" + menuActive);
    });
    menu.addEventListener("click", () => {
        menuButton.classList.remove("active" + menuActive);
        menu.classList.remove("active" + menuActive);
        menuActive = false;
        menuButton.classList.add("active" + menuActive);
        menu.classList.add("active" + menuActive);
    });


    let addCardActive = false;
    let addCardCont = document.querySelector("div.fullscreen#addCard");
    document.querySelector("button#addCard").addEventListener("click", () => {
        addCardCont.classList.remove("active" + addCardActive);
        addCardActive = !addCardActive;
        addCardCont.classList.add("active" + addCardActive);
    });
    document.querySelector("button.addCard.Cancel").addEventListener("click", () => {
        addCardCont.classList.remove("active" + addCardActive);
        addCardActive = !addCardActive;
        addCardCont.classList.add("active" + addCardActive);
    });

    let imageInputAddCard = document.querySelector("#acImage");
    imageInputAddCard.addEventListener("change", () => {
        // document.querySelector("p#fileName.addCard").innerHTML = imageInputAddCard.value;
    });
    document.querySelector("input#fileButton.addCard").addEventListener("click", () => {
        imageInputAddCard.click();
    });

    let accounts = new EDB("secureAccounts");
    let searchResults = document.querySelector("div#searchBox");
    let searchInput = document.querySelector("input#searchInput");
    searchInput.addEventListener("keyup", () => {
        let keyWord = searchInput.value;
        let innerHTML = ``;
        if (keyWord == "") {
            innerHTML = "";
            searchResults.classList.add("none");
        } else {
            searchResults.classList.remove("none");
            for (let i in accounts.content) {
                const element = accounts.content[i];
                if (inStr(keyWord.toLowerCase(), element[0].toLowerCase())) {
                    innerHTML += `
                    <div class="accountResult flex row aic jcb">
                        <a href="./ghost?nickanme=${element[0]}" class="flex row aic jcb">
                            <span class="profileImage block" style="background-image: url('../assets/${element[1][1]}')"></span>
                            <p class="nickname">${element[0]}</p>
                        </a>
                        <button class="subBtn" onclick="subscribe('${element[0]}')">Subscribe</button>
                    </div>
                    `;
                }
            }
        }
        searchResults.innerHTML = innerHTML;
    });

    setTimeout(() => {
        document.querySelector("#NEON_loading").classList.add("fadeout");
    }, 0);
});