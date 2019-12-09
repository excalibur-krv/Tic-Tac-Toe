// Element containing the game board, difficulty, player token options
const gameBoard = document.querySelector(".x_o_selector")

// Elements for handling diffilculty selection options before game starts
const easyDifficulty = document.createElement("div");
const mediumDifficulty = document.createElement("div");

// Elements placeholders for X and O selection options before game starts
const heading = document.createElement("h1");
const oSelector = document.querySelector(".o_selector");
const xSelector = document.querySelector(".x_selector");
const oSelectorBackFace = document.querySelector(".o_backface");
const xSelectorBackFace = document.querySelector(".x_backface");


heading.innerText = "Choose X or O";
heading.classList.add("x_o_title");
gameBoard.prepend(heading);

let player1 = null;
let player2 = null;
let difficulty = null;

// Simulation of synchronous time delay function, needs to be executed with async await

function delay(ms) {
    return new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            resolve(id);
        }, ms);
    });
}

// Functions responsible for hiding and unhiding dom elements and re-triggering game loop

function hideXOSelectors() {
    oSelector.remove()
    oSelectorBackFace.remove();
    xSelector.remove();
    xSelectorBackFace.remove();
    heading.innerText = "Choose Game Difficulty";

    easyDifficulty.innerText = "Easy";
    easyDifficulty.classList.add("x_selector", "difficulty_size");
    gameBoard.append(easyDifficulty);

    mediumDifficulty.innerText = "Medium";
    mediumDifficulty.classList.add("difficulty_size", "medium_size");
    gameBoard.append(mediumDifficulty);

    console.log(`player1 is ${player1}, player2 is ${player2}`);
}

function hideDifficultySelectors() {
    easyDifficulty.remove();
    mediumDifficulty.remove();
    heading.innerText = "Tic-Tac-Toe";
}

// O Token Selector event handlers

oSelector.addEventListener("mouseover", () => {
    oSelector.classList.toggle("flip");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        oSelector.classList.toggle("hide");
        oSelectorBackFace.classList.toggle("unhide");
    })();
});


oSelector.addEventListener("mouseout", () => {
    oSelector.classList.toggle("hide");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        oSelector.classList.toggle("flip")
        oSelectorBackFace.classList.toggle("unhide");
    })();
});

oSelector.addEventListener("click", () => {
    player1 = "O";
    player2 = "X";
    hideXOSelectors();
});

oSelectorBackFace.addEventListener("click", () => {
    player1 = "O";
    player2 = "X";
    hideXOSelectors();
});


// X Token Selector event handlers

xSelector.addEventListener("mouseover", () => {
    xSelector.classList.toggle("flip");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        xSelector.classList.toggle("hide");
        xSelectorBackFace.classList.toggle("unhide");
    })();
});

xSelector.addEventListener("mouseout", () => {
    xSelector.classList.toggle("hide");
    (async function eventDelay() {
        let id = await delay(1000);
        clearTimeout(id);
        xSelector.classList.toggle("flip")
        xSelectorBackFace.classList.toggle("unhide");
    })();
});

xSelector.addEventListener("click", () => {
    player1 = "X";
    player2 = "O";
    hideXOSelectors();
});

xSelectorBackFace.addEventListener("click", () => {
    player1 = "X";
    player2 = "O";
    hideXOSelectors();
});

// Difficulty event handlers

easyDifficulty.addEventListener("click", () => {
    difficulty = "easy";
    hideDifficultySelectors();
});

mediumDifficulty.addEventListener("click", () => {
    difficulty = "medium";
    hideDifficultySelectors();
});