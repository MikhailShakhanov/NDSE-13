const MAX_NUMBER = 2;
class CoinGame {
  constructor() {
    this.answerValue = 1 + Math.floor(Math.random() * (MAX_NUMBER + 1));
    this.gameName = new Date().getTime();
    console.log(`Игра #${this.gameName}`);
    console.log('Выберите 1 (орел) или 2 (решка):');
  }

  tryToGuess(data) {
    let result = '';
    if (this.answerValue === +data) {
      result = 'Win!';
    } else {
      result = 'Lose!';
    }
    console.log(result);
    return result;
  }

  getGameName() {
    return this.gameName;
  }
}

module.exports = CoinGame;
