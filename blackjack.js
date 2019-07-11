// Blackjack Program
// OOP Exercise

// ==================================================================
// ==================================================================
// Enums for card suits and types

const SUITS = {
  HEARTS: '♥',
  CLUBS: '♣',
  SPADES: '♠',
  DIAMONDS: '♦',
};

const TYPES = {
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 10,
  KING: 10,
  QUEEN: 10,
  ACE: 11,
};

// ==================================================================
// ==================================================================
// Card class

class Card {
  constructor(suit, type) {
    this.suit = SUITS[suit];
    this.type = type;
    this.value = TYPES[type];
  }

  printCard() {
    console.log(`[${this.type} of ${this.suit}s]`);
  }
}

// ==================================================================
// ==================================================================
// Deck class

class Deck {
  constructor() {
    this.cards = [];
    Object.keys(SUITS).forEach(suit => {
      Object.keys(TYPES).forEach(type => {
        this.cards.push(new Card(suit, type));
      });
    });
    this.shuffle();
  }

  shuffle() {
    const shuffledCards = [];
    while (this.cards.length > 0) {
      const rand = Math.floor(Math.random() * this.cards.length);
      shuffledCards.push(this.cards.splice(rand, 1)[0]);
    }
    this.cards = shuffledCards;
  }

  dealCard(holder) {
    if (this.cards.length > 0) {
      const theCard = this.cards.shift();
      // console.log(theCard);
      holder.hand.push(theCard);
    } else {
      console.error('Empty deck :(');
    }
  }
}

// ==================================================================
// ==================================================================
// Holder class

class Holder {
  constructor(name, dealer = false) {
    this.name = name;
    this.hand = [];
    this.isDealer = dealer;
    this.beatDealer = false;
  }

  score() {
    return this.hand.reduce((count, card) => count + card.value, 0);
  }

  printInfo(dealerName = '') {
    console.log(`===== ${this.name} =====`);
    this.hand.forEach(card => card.printCard());
    console.log(`Total score = ${this.score()}`);
    // eslint-disable-next-line no-nested-ternary
    const firstHalf = this.isDealer ? 'Is the' : this.beatDealer ? 'Beat' : 'Lost to';
    const dealerParens = dealerName === '' ? '' : ` (${dealerName})`;
    console.log(`${firstHalf} dealer${dealerParens}\n`);
  }

  wantCard(dealer) {
    if (this.score() > 21) {
      this.checkForAce();
    }
    const myScor = this.score();
    const dealCard = dealer.hand[0].value;
    if (this.isDealer && myScor < 16) {
      return true;
    }
    if (myScor <= 11) {
      return true;
    }
    if (myScor >= 17) {
      return false;
    }
    if (myScor < 17 && dealCard <= 6) {
      return false;
    }
    return true;
  }

  checkForAce() {
    this.hand.forEach(card => {
      if (card.type === 'ACE') {
        card.value = 1;
      }
    });
  }
}

// ==================================================================
// ==================================================================
// Table class

class Table {
  constructor(inputHolders) {
    this.deck = new Deck();
    this.genHolders(inputHolders);
  }

  genHolders(inputHolders) {
    this.holders = [];
    // Handles list of names
    if (inputHolders.length) {
      inputHolders.forEach(name => {
        this.holders.push(new Holder(name));
      });
    }
    // Handles number of holders
    else {
      for (let i = 0; i < inputHolders; i++) {
        this.holders.push(new Holder(`Player ${i}`));
      }
    }
    const dealerNum = Math.floor(Math.random() * this.holders.length);
    this.holders[dealerNum].isDealer = true;
  }

  runGame() {
    this.sortHolders();
    this.holders.reverse();
    this.holders.forEach(holder => {
      this.deck.dealCard(holder);
    });
    this.holders.forEach(holder => {
      this.deck.dealCard(holder);
    });
    this.holders.forEach(holder => {
      while (holder.wantCard(this.findDealer())) {
        this.deck.dealCard(holder);
      }
    });
    this.setWinners();
  }

  findDealer() {
    for (let index = 0; index < this.holders.length; index++) {
      if (this.holders[index].isDealer) {
        return this.holders[index];
      }
    }
    return new Holder('No Dealer', true);
  }

  setWinners() {
    const dealerScore = this.findDealer().score();
    this.holders.forEach(holder => {
      if (holder.score() > 21) {
        holder.beatDealer = false;
      } else if (!holder.isDealer && dealerScore > 21) {
        holder.beatDealer = true;
      } else if (holder.score() > dealerScore) {
        holder.beatDealer = true;
      }
    });
  }

  print() {
    const line = '=====================';
    const intro = 'Welcome to Blackjack!';
    console.log(`\n${line}\n${intro}\n${line}\n`);
    this.sortHolders();
    this.holders.forEach(holder => {
      holder.printInfo(this.findDealer().name);
    });
  }

  sortHolders() {
    this.holders.sort((left, right) => {
      if (left.isDealer) {
        return -1;
      }
      if (right.isDealer) {
        return 1;
      }
      return left.name < right.name ? -1 : 1;
    });
  }
}

// ==================================================================
// ==================================================================
// Main run code

console.clear();
// const table = new Table(['Scott', 'Sam', 'Brennan', 'Jon', 'Ayana', 'Andrew']);
const table = new Table(5);
table.runGame();
table.print();
