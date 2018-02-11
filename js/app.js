/*
 * Create a list that holds all of your cards
 */

window.onload = function() {
  reset();
}
const cards = [
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>'
 ];
const fragment = document.createDocumentFragment();
const deck = document.querySelector('.deck');
const moves = document.querySelector('.moves');
const timer = document.querySelector('.timer');
const restart = document.querySelector('.restart');
const modal = document.querySelector('.modal');
const modalCloseButton = document.querySelector('.close');
const modalResetButton = document.querySelector('.playAgain');
const endGameMessage = document.querySelector('.end-game-message');
const turnedCards = [];
let numberOfMoves = 0;
let numberOfMatches = 0;
let startTime = new Date().getTime();
let currentTime;
let endTime;
let elapsed;
let startTimer;

function reset() {
  dealCards();
  resetCounters();
  resetTimer();
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function dealCards() {
    shuffle(cards);
    clearCards();
    cards.forEach(function(element) {
      fragment.appendChild(fragmentFromString(element));
    });
    deck.appendChild(fragment);
}

function clearCards() {
  while(deck.firstChild) {
    // The list is live so it will re-index each call
    deck.removeChild(deck.firstChild);
  }
}

/*
Turns the array of cards written as strings into elements that can be appended to DocumentFragment in dealCards(). DocumentFragment does not take the method insertInnerHTML() like an actual element would, which would have converted the html code in string format into actual Nodes.
SOURCE: https://stackoverflow.com/questions/9284117/inserting-arbitrary-html-into-a-documentfragment
*/
function fragmentFromString(strHTML) {
  // template tag holds HTML code without displaying to client
  let temp = document.createElement('template');
  temp.innerHTML = strHTML;
  return temp.content;
}

//dealCards();

// Shuffle function from http://stackoverflow.com/a/2450976
// Description of Fisher-Yates shuffle https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function displayCard(card) {
  card.classList.add('open');
  card.classList.add('show');
}

function hideCard(card) {
  setTimeout(function() {
    card.classList.remove('open');
    card.classList.remove('show');
  }, 350);

}

function leaveOpen(card) {
  card.classList.add('match');
  card.classList.remove('open');
  card.classList.remove('show');
}

function clearMatchQueue(array) {
  array.splice(0);
}

function checkForMatch(card) {
  if (turnedCards.length < 3) {
    turnedCards.push(card);
  }
  if (turnedCards.length > 1) {
    if (turnedCards[0].isEqualNode(turnedCards[1])) {
      leaveOpen(turnedCards[0]);
      leaveOpen(turnedCards[1]);
      numberOfMatches++;
      if (checkGameOver()) {
        stopTimer();
        gameOver();
      };
    } else {
        hideCard(turnedCards[0]);
        hideCard(turnedCards[1]);
    }
    clearMatchQueue(turnedCards);
    incrementCounter();
    starRating();
  }
}

function setCounter() {
  moves.textContent = numberOfMoves;
}

function resetCounters() {
  numberOfMoves = 0;
  numberOfMatches = 0;
  setCounter();
  starRating();
  elapsed = 0;
  startTime = new Date().getTime();
}

function incrementCounter() {
  numberOfMoves++;
  setCounter();
}

function checkGameOver() {
  return numberOfMatches === 8;
}

function gameOver() {
  modal.style.display = "block";
  endGameMessage.textContent = "It took you " + numberOfMoves + " moves to match all of the cards, and " + endTime + " seconds.";
}

function closeModal() {
  modal.style.display = "none";
}

function openCard(card) {
  // Check if card is already displayed
  if ((card.className ===  'card open show') || (card.className === 'card match')) {
    return true;
  } else {
    return false;
  }
}

function restartFromModal() {
  closeModal();
  reset();
}

function stopTimer() {
  window.clearInterval(startTimer);
  endTime = elapsed;
}

function resetTimer() {
  // Must call everytime a new startTimer is created
  stopTimer();
  /* Needed to assign startTimer function to a variable to use clearInterval in stopTimer function. Needed to embed the startTimer function in another in resetTimer/reset to trigger the start of the interval */
  startTimer = window.setInterval(function() {
    currentTime = new Date().getTime() - startTime;
    elapsed = Math.floor(currentTime/100)/10;
    if (Math.round(elapsed) == elapsed) {
      elapsed += '.0';
    }
    // console.log(elapsed);
    timer.textContent = elapsed;
  }, 100);
}

function starRating(){
  let stars = document.querySelectorAll('.stars');
  if (numberOfMoves === 0) {
    stars[0].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    stars[1].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  if (numberOfMoves === 15) {
    stars[0].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
    stars[1].innerHTML = '<li><i class="fa fa-star"></i></li><li><i class="fa fa-star"></i></li>';
  }
  if (numberOfMoves === 22) {
    stars[0].innerHTML = '<li><i class="fa fa-star"></i>';
    stars[1].innerHTML = '<li><i class="fa fa-star"></i>';
  }
}

deck.addEventListener('click', function(e) {
  const t = e.target;
  if ((t.nodeName === 'LI') && (openCard(t) === false)) {
    displayCard(t);
    checkForMatch(t);
  }
});

restart.addEventListener('click', function() {
  reset();
});

modalCloseButton.addEventListener('click', function() {
  closeModal();
});

modalResetButton.addEventListener('click', function() {
  restartFromModal();
});

window.addEventListener('click', function(event) {
  if (event.target == modal) {
    closeModal();
  }
});
