// Blackjack Program
// Functional Programming Exercise

// ==================================================================
// ==================================================================
// Enums for card suits and types

const SUITS = ['♥', '♣', '♠', '♦'];
const TYPES = [
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Jack',
  'King',
  'Queen',
  'Ace',
];
const VALUES = {
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 10,
  King: 10,
  Queen: 10,
  Ace: 11,
};

// ==================================================================
// ==================================================================
// Main function run

let mainDrawnCards = [];
let dealer;
let players;
[dealer, mainDrawnCards] = makeHolder(mainDrawnCards);
[players, mainDrawnCards] = makePlayers(8, mainDrawnCards);

const dealerScore = calcScore(dealer);
const playerScores = calcAllScores(players);
const playerWins = compareScores(dealerScore, playerScores);

console.clear();
console.log(print(dealer, dealerScore, players, playerScores, playerWins));
// console.log('Drawn cards: ', mainDrawnCards);
// console.log('Dealer hand: ', dealer);
// console.log('Dealer score:', dealerScore);
// console.log('Players hands: ', players);
// console.log('Player scores: ', playerScores);
// console.log('Player wins: ', playerWins);

// ==================================================================

/**
 * Takes all of the below info and formats into a pretty string to be output to the console
 * @param {string[]} dealerHand
 * @param {number} dealerTotal
 * @param {string[][]} allPlayers
 * @param {number[]} playerTotals
 * @param {bool[]} playerVictories
 * @returns a string to be printed
 */
function print(dealerHand, dealerTotal, allPlayers, playerTotals, playerVictories) {
  let output = '';
  const line = '=====================';
  const intro = 'Welcome to Blackjack!';
  output = `\n${line}\n${intro}\n${line}`;

  const dealHandStr = dealerHand.join(', ');
  const dealChunk = `\n===== The Dealer =====\n${dealHandStr}\nDealer's score: ${dealerTotal}`;
  const dealBust = dealerTotal > 21 ? 'Busted!\n' : '';
  output = `${output}\n${dealChunk}${dealBust}`;
  allPlayers.forEach((playerHand, index) => {
    const playerChunk1 = `\n===== Player ${index} =====\n${playerHand.join(', ')}`;
    const playerScoreLine = `Player's score: ${playerTotals[index]}`;
    const playerBust = playerTotals[index] > 21 ? 'Busted!\n' : '';
    const playerWinLine = playerVictories[index]
      ? 'Beat the dealer!'
      : 'Lost to the dealer!';
    output = `${output}\n${playerChunk1}\n${playerScoreLine}${playerBust}\n${playerWinLine}`;
  });
  return output;
}

/**
 * Compares all the player's scores to the dealer's score
 * @param {number} dealerTotal the total score of the dealer's hand
 * @param {number[]} playerTotals an array of the total scores of the players' hands
 * @returns {bool[]} an array of values for whether each player beat the dealer
 */
function compareScores(dealerTotal, playerTotals) {
  return playerTotals.map(playerScore => {
    if (playerScore > 21) {
      return false;
    }
    if (dealerTotal > 21) {
      return true;
    }
    return playerScore > dealerTotal;
  });
}

/**
 * Calculate the total score of the cards in a provided hand
 * @param {string[]} holder the hand of one player
 * @returns {number} the total score of the player's hand
 */
function calcScore(holder) {
  return holder.reduce((total, card) => {
    const type = card.split(' ')[0];
    return total + VALUES[type];
  }, 0);
}

/**
 * Calculates the individual scores for a list of players
 * @param {string[][]} playerList a 2D array, array of 'hand' arrays, each of which is an array of card strings
 * @returns {number[]} an array of the scores of each player
 */
function calcAllScores(playerList) {
  return playerList.map(player => calcScore(player));
}

/**
 * Creates a 2D array of hands of cards, one for each player
 * @param {number} numPlayers
 * @param {string[]} drawnCards array of cards that have already been drawn
 * @returns [] A 2 element array:
 *    --first element is a 2d array of 'hands', one per player
 *    --second is array of drawn cards
 */
function makePlayers(numPlayers, drawnCards) {
  const playerList = [];
  let newDrawnCards = [...drawnCards];
  for (let index = 0; index < numPlayers; index++) {
    let newPlayer;
    [newPlayer, newDrawnCards] = makeHolder(newDrawnCards);
    playerList.push(newPlayer);
  }
  return [playerList, newDrawnCards];
}

/**
 * Creates a hand for a single card holder
 * @param {string[]} drawnCards the cards that have already been drawn
 * @returns [] A 2 element array:
 *    --first element is array of 'cards' for the hand
 *    --second is array of drawn cards
 */
function makeHolder(drawnCards) {
  let newHolder = [];
  let newDrawnCards = [...drawnCards];
  [newHolder, newDrawnCards] = addToHand(newHolder, newDrawnCards);
  [newHolder, newDrawnCards] = addToHand(newHolder, newDrawnCards);
  return [newHolder, newDrawnCards];
}

/**
 * Copies the hand and adds a new card
 * @param {string[]} oldHand the hand before the new card has been added
 * @param {string[]} drawnCards the cards that have already been drawn
 * @returns [] A 2 element array
 *    --first element is a copy of the old hand with a new card added
 *    --second is array of drawn cards
 */
function addToHand(oldHand, drawnCards) {
  const [newCard, newDrawnCards] = getCard(drawnCards);
  const newHand = [...oldHand];
  newHand.push(newCard);
  return [newHand, newDrawnCards];
}

/**
 *
 * @param {string[]} drawnCards the cards that have already been drawn
 * @returns [] A 2 element array
 *    --first element is a new card string
 *    --second is array of drawn cards
 */
function getCard(drawnCards) {
  let newCard = '';
  do {
    const suitIndex = Math.floor(Math.random() * SUITS.length);
    const typeIndex = Math.floor(Math.random() * TYPES.length);
    newCard = `${TYPES[typeIndex]} of ${SUITS[suitIndex]}`;
  } while (drawnCards.includes(newCard));
  const newDrawnCards = [...drawnCards];
  newDrawnCards.push(newCard);
  return [newCard, newDrawnCards];
}

// ==================================================================
// ==================================================================
