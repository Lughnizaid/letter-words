const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const start = document.querySelector('.btn__reset');
const randomDiv = document.getElementById('phrase');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const qwerty = document.getElementById('qwerty');
const letterButtons = qwerty.getElementsByTagName('button');
const scoreboard = document.getElementById('scoreboard');
const triesLi = scoreboard.getElementsByClassName('tries');
const randomUl = randomDiv.querySelector('ul');

start.addEventListener('click',function ()  {
    overlay.style.display = "none";
});

var missed = 0;

const phrases = [
    'Yogyakarta cool',
    'This is nice',
    'Basketball Nice',
    'Never down',
    'Keeping Real'
];


//function to choose phrases
function getRandomPhraseAsArray(arr) {
    const quotePhrase = arr[Math.floor(Math.random()*6)];
    const upperRandom = quotePhrase.toUpperCase();
    return upperRandom.split('');
}
//call the function to choose phrases
const randomArray = getRandomPhraseAsArray(phrases);



// Function to display the phrases
function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        var arri = arr[i];
        var liLetter = document.createElement('li');
        randomUl.appendChild(liLetter);
        liLetter.innerHTML = arri;

        if (arri === ' ') {
            liLetter.className = 'space';
        } else {
            liLetter.className = 'letter';
        }
    }
}

addPhraseToDisplay(randomArray);

//Letter clicked vs random phrasess

function checkLetter(button) {
    const fontClicked = button.innerHTML;
    var letterFound = null;

    for (let i = 0; i < letter.length; i++){
        if (fontClicked === letter[i].innerHTML.toLowerCase()) {
            letter[i].classList.add('show');
            letterFound = true;
            letterFound = fontClicked;
        }
    }
    return letterFound;
}
//function chekWin

function checkWin() {
  const correctGuess = letter.length;
  const allFonts = show.length;
  //Function flex;
  function flex () {
    overlay.style.display = 'flex';
    return;
  }

    if (correctGuess === allFonts) {
        overlay.classList.add('win');
        flex ();
        start.textContent = "play"
        title.textContent = "Great. You won buddy!"
    }

    else if (missed >= 5) {
        overlay.classList.add('lose');
        flex ();
        start.textContent = "play"
        title.textContent = "Uhh You lose!"
    } else {}
}

function resetHeart () {
  for (let i = 0; i < triesLi.length; i++) {
      const img = triesLi[i].getElementsByTagName('img')[0];
      img.src = 'images/liveHeart.png';
  }
}

function resetLi () {
  while (randomUl.children.length > 0) {
      randomUl.removeChild(randomUl.children[0]);
  }
}

function newButton () {
  for (let i = 0; i < letterButtons.length; i++) {
      letterButtons[i].classList.remove('chosen');
      letterButtons[i].disabled = false;
  }
}

function newLi () {
  const resetPhrases = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(resetPhrases);
}

function newLayout () {
  overlay.style.display = "none";
}

//When fonts button is pressed
window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound = checkLetter(e.target);

        if (letterFound === null) {
            missed += 1;
        }

        if (missed >= 1 && missed <= 5){
            const heart = triesLi[triesLi.length-missed];
            heart.getElementsByTagName('img')[0].src = 'images/lostHeart1.jpg';
        }
    }
    checkWin();
});


//Reset
start.addEventListener('click', (e) => {
    if (e.target.textContent === 'play') {
        // set missed to 0
        missed = 0;
        resetHeart ();
        resetLi ();
        newLi ();
        newLayout ();
        newButton ();
}
});
