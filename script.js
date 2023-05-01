import { setupGround, updateGround } from "./ground.js";
const WORLD_WIDTH = 100;
const WORLD_HEIGHT = 30;
const SPEED_SCALE_INCREASE = 0.00001;

const worldElem = document.querySelector("[data-world]");
const scoreElem = document.querySelector("[data-score]");

let lastTime = null;
let speedScale = 1;
let score = null;
let shouldUpdateSpeedScale = true;
let speedTimer = null;

const updateSpeedScale = (delta) => {
    speedScale += delta * SPEED_SCALE_INCREASE;
    shouldUpdateSpeedScale = true;
    speedTimer = null;
};

const updateScore = (delta) => {
    score += delta * 0.01; //10 points per second
    scoreElem.textContent = Math.floor(score);
};
const update = (time_ms) => {
    //time in milliseconds
    if (lastTime === null) {
        lastTime = time_ms;
        window.requestAnimationFrame(update);
        return;
    }

    let delta = time_ms - lastTime;
    //updateGround(delta, 1);

    /*if (shouldUpdateSpeedScale) {
        speedTimer = setTimeout(() => {
            updateSpeedScale(delta);
        }, 1000);
        shouldUpdateSpeedScale = false;
    }*/
    updateSpeedScale(delta);
    updateGround(delta, speedScale);

    updateScore(delta);
    lastTime = time_ms;
    window.requestAnimationFrame(update);
};

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
    speedScale = 1;
    score = 0;
    if (speedTimer !== null) {
        clearTimeout(speedTimer);
    }
    setupGround();
    window.requestAnimationFrame(update);
};
scaleWorldWidth();
window.addEventListener("resize", scaleWorldWidth);
window.addEventListener("keydown", handleStart, { once: true });
