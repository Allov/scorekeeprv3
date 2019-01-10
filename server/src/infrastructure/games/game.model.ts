import mongoose from 'mongoose';
import { Player } from '../players/player.model';
import { Round } from '../rounds/round.model';

const gameSchema = new mongoose.Schema({
  createdAt: {
    required: true,
    type: Date,
    unique: false,
  },
  createdBy: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
    unique: false,
  },
  players: [Player],
  rounds: [Round],
  shareId: {
    required: true,
    type: String,
    unique: true,
  },
});

gameSchema.set('toObject', {virtuals: true});

export default mongoose.model('Game', gameSchema);
