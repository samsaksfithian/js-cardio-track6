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

  // TODO: javadoc comments
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

  // TODO: javadoc comments
  shuffle() {
    const shuffledCards = [];
    while (this.cards.length > 0) {
      const rand = Math.floor(Math.random() * this.cards.length);
      shuffledCards.push(this.cards.splice(rand, 1)[0]);
    }
    this.cards = shuffledCards;
  }

  // TODO: javadoc comments
  dealCard(holder) {
    if (this.cards.length > 0) {
      holder.takeCard(this.cards.shift());
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

  // TODO: javadoc comments
  score() {
    return this.hand.reduce((count, card) => count + card.value, 0);
  }

  // TODO: javadoc comments
  printInfo(dealerName = '??') {
    console.log(`===== ${this.name} =====`);
    this.hand.forEach(card => card.printCard());
    console.log(`Total score = ${this.score()}`);
    if (this.score() > 21) {
      console.log('Busted! 💣💥');
    }
    const vsDealer = this.beatDealer ? 'Beat' : 'Lost to';
    let outputStr = `${vsDealer} the dealer (${dealerName})`;
    if (this.isDealer) {
      outputStr = '⭐⭐   -Is the dealer- ⭐⭐';
    }
    console.log(outputStr, '\n');
    // legacy nested ternary for posterity
    // const firstHalf = this.isDealer ? 'Is the' : this.beatDealer ? 'Beat' : 'Lost to';
  }

  // TODO: javadoc comments
  takeCard(card) {
    this.hand.push(card);
  }

  // TODO: javadoc comments
  wantCard(dealer) {
    if (this.score() > 21) {
      this.checkForAce();
    }
    const myScore = this.score();
    const dealCard = dealer.hand[0].value;
    if (this.isDealer && myScore < 16) {
      return true;
    }
    if (myScore <= 11) {
      return true;
    }
    if (myScore >= 17) {
      return false;
    }
    if (myScore < 17 && dealCard <= 6) {
      return false;
    }
    return true;
  }

  // TODO: javadoc comments
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

  // TODO: javadoc comments
  genHolders(inputHolders) {
    this.holders = [];
    // Handles list of names
    if (inputHolders.length) {
      // TODO: probably could/should use typeof instead
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

  // TODO: javadoc comments
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

  // TODO: javadoc comments
  findDealer() {
    for (let index = 0; index < this.holders.length; index++) {
      if (this.holders[index].isDealer) {
        return this.holders[index];
      }
    }
    return new Holder('No Dealer', true);
  }

  // TODO: javadoc comments
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

  // TODO: javadoc comments
  printGame() {
    const line = '=====================';
    const intro = 'Welcome to Blackjack!';
    console.log(`\n${line}\n${intro}\n${line}\n`);
    this.sortHolders();
    this.holders.forEach(holder => {
      holder.printInfo(this.findDealer().name);
    });
  }

  // TODO: javadoc comments
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
const table = new Table(2);
table.runGame();
table.printGame();
