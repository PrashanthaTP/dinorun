import { setupGround, updateGround } from "./ground.js"
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;

const worldElem = document.querySelector("[data-world]");

let lastTime = null;
const update = (time) => {
    if (lastTime === null) {
        lastTime = time;
        window.requestAnimationFrame(update)
        return
    }
    let delta = time - lastTime
    updateGround(delta, 1)
    lastTime = time
    window.requestAnimationFrame(update)
}


const scaleWorldWidth = () => {
    let reqRatio = WORLD_WIDTH / WORLD_HEIGHT;
    let currRatio = window.innerWidth / window.innerHeight;
    let scale = 1;
    if (currRatio < reqRatio) {
        /* scale =
            (WORLD_WIDTH / WORLD_HEIGHT) *
            (window.innerHeight / window.innerWidth);
        worldElem.style.width = `${window.innerWidth * scale}px`;*/
        scale = window.innerWidth / WORLD_WIDTH;
    } else {
        /* scale =
            (WORLD_WIDTH / WORLD_HEIGHT) *
            (window.innerHeight / window.innerWidth);
        worldElem.style.height = `${window.innerHeight / scale}px`;*/
        scale = window.innerHeight / WORLD_HEIGHT;
    }
    worldElem.style.width = `${WORLD_WIDTH * scale}px`;
    worldElem.style.height = `${WORLD_HEIGHT * scale}px`;
};

const handleStart = () => {
    lastTime = null;
    setupGround()
    window.requestAnimationFrame(update)
}
scaleWorldWidth();
window.addEventListener("resize", scaleWorldWidth);
window.addEventListener("keydown",handleStart,{once:true})
