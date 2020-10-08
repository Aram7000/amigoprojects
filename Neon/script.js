window.onload = () => {
    n_onload();
    let menu = {
        button: document.querySelector("#NEON_icon"),
        container: document.querySelector("#Menu_Button"),
        opened: false,
        fn: () => {
            if (!menu.opened) {
                menu.container.classList.add("opened");
                menu.container.classList.remove("closed");
                menu.opened = true;
            } else {
                menu.container.classList.remove("opened");
                menu.container.classList.add("closed");
                menu.opened = true;
            }
        },
        open: () => {
            if(!menu.opened) {
                menu.container.classList.add("opened");
                menu.container.classList.remove("closed");
                menu.opened = true;
            }
        },
        close: () => {
            if (menu.opened) {
                menu.container.classList.remove("opened");
                menu.container.classList.add("closed");
                menu.opened = false;
            }
        }
    }

    menu.button.addEventListener("mouseup", () => {
        menu.open()
    });

    


    document.body.addEventListener("mousedown", () => {
        menu.close();
    });

    

    setTimeout(() => {
        loadEnd()
    }, 20);
}