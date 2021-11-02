setup = () => {
  let scn = scene(0, 0, window.innerWidth, window.innerHeight);
  let person = cube(0, 0, 0, 100, 100, 100, scn, "radial-gradient(#ff0000, #553300)");
  
  let y = 0;
  
  
  document.addEventListener("keydown", () => {
    y += 10;
    person.cube.style.top = y + "px";
    
  });
  
}
