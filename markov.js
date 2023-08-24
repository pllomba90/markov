/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    this.chains = {};
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      
      if (!this.chains[word]) {
        this.chains[word] = [];
      }
      this.chains[word].push(nextWord);
    }
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const words = Object.keys(this.chains);
    let currentWord = words[Math.floor(Math.random() * words.length)];
    let output = [currentWord];
    
    while (output.length < numWords) {
      const nextWordOptions = this.chains[currentWord];
      if (!nextWordOptions || nextWordOptions.length === 0) {
        break;
      }
      const nextWord = nextWordOptions[Math.floor(Math.random() * nextWordOptions.length)];
      output.push(nextWord);
      currentWord = nextWord;
    }
    
    return output.join(' ');
  }
} 

module.exports = MarkovMachine;