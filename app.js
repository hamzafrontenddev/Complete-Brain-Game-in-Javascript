let cardsArray = [
    {
        'name': 'DILL',
        'img': 'Dill.png',
    },
    {
        'name': 'ROSEFLOWER1',
        'img': 'Roseflower1.jpg',
    },
    {
        'name': 'MUSKRAHAT',
        'img': 'Muskrahat.jpg',
    },
    {
        'name': 'ANIMAL',
        'img': 'animal.jpg',
    },
    {
        'name': 'MONKEY',
        'img': 'Monkey.jpg',
    },
    {
        'name': 'ROSEFLOWER',
        'img': 'Roseflower.jpg',
    },
];

const gamecard = cardsArray.concat(cardsArray);
let shuffledchild = Array.from(gamecard).sort(() => 0.5 - Math.random());

const cards = document.querySelector("#card-section");
const body = document.querySelector("body");

let clickCount = 0;
let firstCard = "";
let secondCard = "";
let score = 0;
let level = 1;

const scoreDisplay = document.createElement("h2");
scoreDisplay.textContent = `Score: ${score}`;
scoreDisplay.style.color = "#fff";
body.insertBefore(scoreDisplay, cards);

const buttonContainer = document.createElement("div");
buttonContainer.style.marginTop = "20px";
buttonContainer.style.display = "flex";
buttonContainer.style.gap = "30px";
body.appendChild(buttonContainer);

const createButton = (text, id) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.id = id;
    button.style.padding = "10px 50px";
    button.style.border = "none";
    button.style.borderRadius = "15px";
    button.style.cursor = "pointer";
    button.style.backgroundColor = "var(--border-color)";
    button.style.color = "#000";
    button.style.fontSize = "3rem";
    buttonContainer.appendChild(button);
    return button;
};

const nextButton = createButton("Next", "next-btn");
const resetButton = createButton("Reset", "reset-btn");

const card_matches = () => {
    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach(cruElem => {
        cruElem.classList.add('card_match');
    });

    score += 10;
    scoreDisplay.textContent = `Score: ${score}`;

    // Check if all cards are matched to complete the level
    const allMatched = document.querySelectorAll('.card_match').length === shuffledchild.length;

    if (allMatched) {
        setTimeout(() => {
            alert('Level Complete!');
            level++;
            start_game();
        }, 500);
    }
};

const reset_game = () => {
    firstCard = "";
    secondCard = "";
    clickCount = 0;

    let card_selected = document.querySelectorAll('.card_selected');

    card_selected.forEach(cruElem => {
        cruElem.classList.remove('card_selected');
    });
};

const start_game = () => {
    cards.innerHTML = "";
    shuffledchild = Array.from(gamecard).sort(() => 0.5 - Math.random());
    shuffledchild.forEach(item => {
        const div = document.createElement("div");
        div.classList.add('card');
        div.dataset.name = item.name;

        const front_div = document.createElement('div');
        front_div.classList.add('front-card');

        const back_div = document.createElement('div');
        back_div.classList.add('back-card');
        back_div.style.backgroundImage = `url(${item.img})`;

        cards.appendChild(div);
        div.appendChild(front_div);
        div.appendChild(back_div);
    });
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
};

cards.addEventListener('click', (event) => {
    let curCard = event.target;

    if (curCard.id === "card-section" || curCard.parentNode.classList.contains('card_match') || curCard.parentNode.classList.contains('card_selected')) {
        return false;
    }

    clickCount++;

    if (clickCount < 3) {
        if (clickCount === 1) {
            firstCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
        } else {
            secondCard = curCard.parentNode.dataset.name;
            curCard.parentNode.classList.add('card_selected');
        }

        if (firstCard !== "" && secondCard !== "") {
            if (firstCard === secondCard) {
                setTimeout(() => {
                    card_matches();
                    reset_game();
                }, 1000);
            } else {
                setTimeout(() => {
                    reset_game();
                }, 1000);
            }
        }
    }
});

nextButton.addEventListener("click", () => {
    // Check if all cards are matched before moving to the next level
    const allMatched = document.querySelectorAll('.card_match').length === shuffledchild.length;

    if (allMatched) {
        alert('Level Complete!');
        level++;
        start_game();
    } else {
        alert('Please complete the level before moving to the next one.');
    }
});

resetButton.addEventListener("click", () => {
    score = 0;
    level = 1; // reset level to 1 on reset
    scoreDisplay.textContent = `Score: ${score}`;
    start_game();
});

start_game();
