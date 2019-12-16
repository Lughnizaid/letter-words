const overlay = document.getElementById('overlay');
const title = document.querySelector('.title');
const startGame = document.querySelector('.btn__reset');
const randomDiv = document.getElementById('phrase');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const qwerty = document.getElementById('qwerty');
const letterButtons = qwerty.getElementsByTagName('button');
const scoreboard = document.getElementById('scoreboard');
const triesLi = scoreboard.getElementsByClassName('tries');
const randomUl = randomDiv.querySelector('ul');




startGame.addEventListener('click',function ()  {
    overlay.style.display = "none";
});

var missed = 0;

const phrases = [
    'Yogyakarta cool',
    'This is nice',
    'Basketball Nice',
    'Never down',
    'Keeping Real',
];


//function to choose phrases
function getRandomPhraseAsArray(array) {
    const randomPhrase = array[Math.floor(Math.random() * array.length)];
    return randomPhrase.toUpperCase().split('');
}
//call the function to choose phrases
const randomArray = getRandomPhraseAsArray(phrases);



// Function to display the phrases
function addPhraseToDisplay(array) {
    for (let i = 0; i < array.length; i++) {
        var arri = array[i];
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
    overlay.style.display = '';
    return;
  }

    if (correctGuess === allFonts) {
        overlay.classList.add('win');
        flex ();
        startGame.textContent = "play"
        title.textContent = "Great. You won buddy!"
    }

    if (missed >= 5) {
        overlay.classList.add('lose');
        flex ();
        startGame.textContent = "play"
        title.textContent = "Uhh You lose!"
    }
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

function newLayout () {
overlay.classList.remove('win', 'lose');
}

function newLi () {
  const resetPhrases = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(resetPhrases);
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
startGame.addEventListener('click', (e) => {
    if (e.target.textContent === 'play') {
        // set missed to 0
        missed = 0;
        resetHeart ();
        resetLi ();
        newLi ();
        newButton ();
        newLayout ();
}
});
