/* =========================
   DOM ELEMENTS
========================= */

const spinner = document.getElementById("spinner");
const pushBtn = document.getElementById("pushBtn");
const promptModal = document.getElementById("promptModal");
const promptTitle = document.getElementById("promptTitle");
const promptText = document.getElementById("promptText");
const closeModal = document.getElementById("closeModal");
const headerText = document.getElementById("headerText");
const revealAnswerButton = document.getElementById("revealAnswerButton");
const spinAgainButton = document.getElementById("spinAgainButton");

const clickSound = document.getElementById("clickSound");
const spinSound = document.getElementById("spinSound");


const infoIcon = document.getElementById("infoIcon");
const infoModal = document.getElementById("infoModal");
const closeInfo = document.getElementById("closeInfo");
const infoModalText = document.getElementById("infoModalText");
const buttonCollection = document.getElementById("buttonCollection");

/* =========================
   HEADER TEXT OPTIONS
========================= */

const headerTextList = [
  "Dare to Push?",
  "PUSH THE RED BUTTON!",
  "What will it be?",
  "Take a Chance!",
  "Spin the Wheel!",
  "It can't be that bad!",
  "Fortune Favors the Bold!",
  "Your Fate Awaits!",
  "Go on, Push it!",
  "Spin that MF WHEEL!"
];

/* =========================
   CATEGORY → TITLE MAP
========================= */

const CATEGORY_TITLES = {
  shot: "SHOT O' CLOCK",
  trivia: "TRIVIA",
  personal: "WHO ARE YOU?",
  point: "WHO'S THAT?"
};

/* =========================
   PROMPTS
========================= */

const prompts = {
  buyADrink: { category: "shot", text: "Buy the next person you make eye contact with a drink" },
  rockPaperScissors: { category: "shot", text: "Challenge someone to rock-paper-scissors. If you lose, buy them a drink." },
  takeAShot: { category: "shot", text: "Take a shot!!!" },
  phoneCheck: { category: "shot", text: "If you checked your phone in the last 5 minutes, take a drink" },
  travelShot: { category: "shot", text: "Take a shot if you have ever traveled outside your home country." },
  panthersPlayoffs: { category: "shot", text: "Will the Carolina Panthers make the playoffs this year? Take a drink for YES, two drinks for NO." },

  colorCombo: {
    category: "trivia",
    text: "What color do you get from mixing red and blue?",
    answer: "Purple"
  },
  tootsiePop: {
    category: "trivia",
    text: "According to Mr. Owl, how many licks does it take to get to the tootsie roll center of a Tootsie Pop?",
    answer: "Three"
  },
  chicago_trivia: {
    category: "trivia",
    text: "What U.S. city is nicknamed 'The Windy City'?",
    answer: "Chicago"
  },
  edgarAllanPoe_trivia: {
    category: "trivia",
    text: "Which author wrote 'The Raven'?",
    answer: "Edgar Allan Poe"
  },
  halo_trivia: {
    category: "trivia",
    text: "In Halo, what is the name of the main character?",
    answer: "Master Chief"
  },
  space_trivia: {
    category: "trivia",
    text: "What planet is known as the Red Planet?",
    answer: "Mars"
  },
  pacman_trivia: {
    category: "trivia",
    text: "Pac-Man ghosts are Blinky, Inky, Pinky, and who?",
    answer: "Clyde"
  },
  starwars_trivia: {
    category: "trivia",
    text: "Who created Star Wars?",
    answer: "George Lucas"
  },
  baberuth_trivia: {
    category: "trivia",
    text: "George Herman Ruth Jr. is better known as?",
    answer: "Babe Ruth, The Sultan of Swat, The Bambino"
  },
  ameliaEarhart_trivia: {
    category: "trivia",
    text: "Who was the first woman to fly solo across the Atlantic?",
    answer: "Amelia Earhart"
  },
  graceHopper_trivia: {
    category: "trivia",
    text: "Grace Hopper popularized what term for fixing errors?",
    answer: "Debugging"
  },

  bestMomentYear: { category: "personal", text: "Best moment of your year?" },
  childhoodMemory: { category: "personal", text: "Best or worst childhood memory?" },
  dreamVacation: { category: "personal", text: "What's your dream vacation destination?" },
  hiddenTalent: { category: "personal", text: "What's a hidden talent most people don’t know about you?" },
  lifeLesson: { category: "personal", text: "What's a lesson you'd teach your great grandkids?" },
  villainOrigin: { category: "personal", text: "Tell us your villain origin story." },
  terribleJoke: { category: "personal", text: "Tell a terrible joke!" },
  lastPhoto: { category: "personal", text: "Show the last photo you took on your phone and explain it." },
  conspiracy: { category: "personal", text: "What's a conspiracy theory you secretly think might be true?" },

  auxCord: { category: "point", text: "This person should not be trusted with the aux cord." },
  threeDrinks: { category: "point", text: "This person turns into a menace after drink #3." },
  surviveApocalypse: { category: "point", text: "This person would die first in an apocalypse." },
  robotAdoption: { category: "point", text: "This person would adopt an android as a pet." },
  bingeWatch: { category: "point", text: "This person would binge-watch a TV series in one day." },
  worldTakeover: { category: "point", text: "This person would be most likely to try taking over the world." },
  light_drinker: { category: "point", text: "This person is a lightweight when it comes to drinking." },
  secret_arsonist: { category: "point", text: "This person would blow up a building on accident and not speak a word of it." }
};

/* =========================
   PROMPT DECK (NO REPEATS)
========================= */

let availablePrompts = Object.values(prompts);
let usedPrompts = [];

/* =========================
   SPIN + PROMPT LOGIC
========================= */

let rotation = 0;
let currentPrompt = null;

pushBtn.addEventListener("click", () => {
  const timeToWait = 2600;
  pushBtn.disabled = true;
  revealAnswerButton.classList.add("hidden");
  additionalPromptText.classList.add("hidden");
   // 🔊 Instant feedback
  playSound(clickSound);

  playSound(spinSound);


  if (availablePrompts.length === 0 || availablePrompts.length < 1) {
    availablePrompts = [...usedPrompts];
    usedPrompts = [];
  }

  const spinAmount = Math.floor(Math.random() * 3000) + 5000;
  rotation += spinAmount;
  spinner.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    // 🔇 Stop spinning sound exactly when spinner stops
    stopSound(spinSound);
    
    const index = Math.floor(Math.random() * availablePrompts.length);
    currentPrompt = availablePrompts.splice(index, 1)[0];
    //currentPrompt = prompts.colorCombo
    //console.log(currentPrompt);
    usedPrompts.push(currentPrompt);
    console.log(CATEGORY_TITLES[currentPrompt.category]);

    if(currentPrompt.category === "trivia") {
      
      additionalPromptText.classList.remove("hidden");
      additionalPromptText.textContent = "Correct Answer: Pick someone to drink. \n Incorrect Answer: Take a shot!";
      console.log("ADDITIONAL PROMPT TEXT:" +  additionalPromptText.textContent);
    }

    promptTitle.textContent = CATEGORY_TITLES[currentPrompt.category];
    

    //promptTitle.classList.remove("hidden");

    promptText.textContent = currentPrompt.text;
    //console.log(promptText.textContent);
    

    if (currentPrompt.category === 'trivia') {
      console.log("CURRENT PROMPT:", currentPrompt);
      console.log("CATEGORY:", currentPrompt?.category);

      revealAnswerButton.classList.remove("hidden");
      revealAnswerButton.textContent = "3 Guesses, then reveal";
      revealAnswerButton.style.backgroundColor = "#ff0033";
      revealAnswerButton.style.color = "white";
    }

    promptModal.classList.remove("hidden");
    pushBtn.disabled = false;
  }, timeToWait);
});

revealAnswerButton.addEventListener("click", () => {

  if(currentPrompt.answer === "Purple") {
    revealAnswerButton.style.backgroundColor = "purple";
  }else{
    revealAnswerButton.style.backgroundColor = "green";
  }

  revealAnswerButton.textContent = currentPrompt.answer;
 
  revealAnswerButton.style.color = "white";
});

/* =========================
   REVEAL ANSWER → INFO MODAL
========================= */

revealAnswerButton.addEventListener("click", () => {
  revealAnswerButton.textContent = currentPrompt.answer;
});

/* =========================
   CLOSE MODALS
========================= */

closeModal.addEventListener("click", () => {
  headerText.textContent =
  headerTextList[Math.floor(Math.random() * headerTextList.length)];
  promptModal.classList.add("hidden");
  revealAnswerButton.classList.add("hidden");
});

infoIcon.addEventListener("click", () => {
  infoModal.classList.remove("hidden");
});

closeInfo.addEventListener("click", () => {
  infoModal.classList.add("hidden");
});

infoModal.addEventListener("click", (e) => {
  if (e.target === infoModal) {
    infoModal.classList.add("hidden");
    
  }
});

//Spin Again Button

spinAgainButton.addEventListener("click", () => {
  promptModal.classList.add("hidden");
  pushBtn.click();
});

//Sound functions
function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
  sound.currentTime = 0;
}


/*
// Play click sound on button press
pushBtn.addEventListener("click", () => {
  pushBtn.disabled = true;

  // 🔊 Instant feedback
  playSound(clickSound);

  let timeToWait = 2600;

  // 🔊 Start spinning sound
  playSound(spinSound);

  const spinAmount = Math.floor(Math.random() * 3000) + 5000;
  rotation += spinAmount;
  spinner.style.transform = `rotate(${rotation}deg)`;

  setTimeout(() => {
    // 🔇 Stop spinning sound exactly when spinner stops
    stopSound(spinSound);

    const promptValues = Object.values(prompts);
    const randomPrompt = promptValues[Math.floor(Math.random() * promptValues.length)];

    currentPrompt = randomPrompt;

    if (currentPrompt?.revealAnswer) {
      revealAnswerButton.classList.remove("hidden");

    } else {
      revealAnswerButton.classList.add("hidden");
    }

    promptTitle.textContent = CATEGORY_TITLES[currentPrompt.category];
    promptText.textContent = currentPrompt.text;
    promptModal.classList.remove("hidden");

    pushBtn.disabled = false;
  }, timeToWait);
});
*/
function fadeOutSound(sound, duration = 300) {
  const step = sound.volume / (duration / 30);
  const fade = setInterval(() => {
    if (sound.volume > step) {
      sound.volume -= step;
    } else {
      sound.volume = 0;
      sound.pause();
      sound.currentTime = 0;
      sound.volume = 1;
      clearInterval(fade);
    }
  }, 30);
}


