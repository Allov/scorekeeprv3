import mongoose from 'mongoose';

const Score = new mongoose.Schema({
  playerId: String,
  points: Number,
});

const Round = new mongoose.Schema({
  number: Number,
  scores: [Score]
})

const Player = new mongoose.Schema({
  name: String,
})

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  shareId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    required: true,
    unique: false,
  },
  players: [Player],
  rounds: [Round],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

gameSchema.set('toObject', {virtuals: true});

export default mongoose.model('Game', gameSchema);
