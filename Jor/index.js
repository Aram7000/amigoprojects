let setup = () => {

    let scn = scene(0, 0, window.innerWidth, window.innerHeight);


    let plane = cube(0, window.innerHeight - 100, 0, window.innerWidth, 1, 1000, scn, "linear-gradient(45deg, #339900, #009900)")

    let key = {
        w: false,
        d: false,
        s: false,
        a: false,
    }

    let person = {
        obj: cube(100, 100, 0, 100, 100, 100, scn, "radial-gradient(#ff0000, #5500ff)"),
        x: 100,
        y: window.innerHeight - 200,
        z: 0,

        r: 0,
        xspeed: 0,
        yspeed: 90,

        update: () => {
            if (person.r > 180) {
                person.r -= 360;
            } else if (person.r < -180) {
                person.r += 360;
            }
            person.obj.cube.style.left = `${person.x}px`;
            person.obj.cube.style.top = `${person.y}px`;
            person.obj.cube.style.transform = `translateZ(${person.z}px)`;
            person.obj.object.style.transform = `rotateY(${person.r}deg)`

        }
    }

    document.addEventListener("keydown", (evt) => {
        if (evt.keyCode == 87) {
            key.w = true;
        } if (evt.keyCode == 68) {
            key.d = true;
        } if (evt.keyCode == 83) {
            key.s = true;
        } if (evt.keyCode == 65) {
            key.a = true;
        }
    });

    document.addEventListener("keyup", (evt) => {
        if (evt.keyCode == 87) {
            key.w = false;
        } if (evt.keyCode == 68) {
            key.d = false;
        } if (evt.keyCode == 83) {
            key.s = false;
        } if (evt.keyCode == 65) {
            key.a = false;
        }
    });

    setInterval(() => {
        if (key.w) {
            person.z -= person.yspeed / 10;
            person.x += person.xspeed / 10;
        } if (key.d) {
            person.r -= 5;
            person.yspeed = - Math.abs(person.r) + 90;
            person.xspeed = -((90 - Math.abs(person.yspeed)) * ((person.r + 0.00001) / Math.abs(person.r + 0.00001)));
        } if (key.s) {
            person.z += person.yspeed / 10;
            person.x -= person.xspeed / 10;
        } if (key.a) {
            person.r += 5;
            person.yspeed = - Math.abs(person.r) + 90;
            person.xspeed = -((90 - Math.abs(person.yspeed)) * ((person.r + 0.00001) / Math.abs(person.r + 0.00001)));
        }
        person.update();
    }, 10)

    person.obj.side.front.style.background = "radial-gradient(#ffff00, #5500ff)";
    person.update();
}
