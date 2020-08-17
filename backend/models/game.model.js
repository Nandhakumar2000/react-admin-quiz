const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameDetailsSchema = new Schema({
   question: {type: String,required: true},
   answer: {type: String, required: true},
   image: {type: String, required: true},
   shuffledAnswer: {type: String, required: true},
});

const gameSchema = new Schema({
  gameName: { type: String, required: true },
  gameBanner: { type: String, required: true },
  questionTime: { type: Number, required: true },
  grandPriceImage: { type: String, required: true },
  gameType: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  questions: [gameDetailsSchema]
}, {
  timestamps: true,
});

//const GameDetails = mongoose.model('GameDetails', gameDetailsSchema);
const Game = mongoose.model('Game', gameSchema);
module.exports = Game;
//module.exports = GameDetails;