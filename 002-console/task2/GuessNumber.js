const MAX_NUMBER = 100;
class GuessNumber {
  constructor() {
    this.answerNumber = Math.floor(Math.random() * (MAX_NUMBER + 1));
    console.log('Загадано число в диапазоне от 0 до 100');
  }

  tryToGuess(data) {
    if (this.answerNumber > +data)
      console.log('Больше');
    if (this.answerNumber < +data)
      console.log('Меньше');
    if (this.answerNumber === +data)
      console.log(`Отгадано число ${this.answerNumber}`);
  }

}

module.exports = GuessNumber;