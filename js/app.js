/*
 * Create a list that holds all of your cards
 */
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
*/
function fragmentFromString(strHTML) {
  // template tag holds HTML code without displaying to client
  let temp = document.createElement('template');
  temp.innerHTML = strHTML;
  return temp.content;
}

dealCards();

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
