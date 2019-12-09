// Elements placeholders for X and O selection options before game starts
const heading = document.createElement("h1");
const oSelector = document.querySelector(".o_selector");
const xSelector = document.querySelector(".x_selector");
const oSelectorBackFace = document.querySelector(".o_backface");
const xSelectorBackFace = document.querySelector(".x_backface");

heading.innerText = "Choose X or O";
heading.classList.add("x_o_title");
document.querySelector(".x_o_selector").prepend(heading);

let player1 = null;
let player2 = null;
let difficulty = null;

// simulation of synchronous time delay function, needs to be executed with async await

function delay(ms) {
    return new Promise((resolve, reject) => {
        let id = setTimeout(() => {
            resolve(id);
        }, ms);
    });
}

function hideXOSelectors() {
    oSelector.remove()
    oSelectorBackFace.remove();
    xSelector.remove();
    xSelectorBackFace.remove();
    heading.remove();
    console.log(`player1 is ${player1}, player2 is ${player2}`);
}

// O Selector event handlers

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


// X Selector event handlers

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