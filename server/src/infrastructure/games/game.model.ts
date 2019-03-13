import { Document, Model, model, Schema }  from 'mongoose';
import { PlayerSchema } from '../players/player.model';
import { RoundSchema } from '../rounds/round.model';
import { IGame } from './game.types';

export interface IGameModel extends IGame, Document {

}

export const GameSchema = new Schema({
  createdAt: {
    required: true,
    type: Date,
    unique: false,
  },
  createdBy: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  },
  name: {
    required: true,
    type: String,
    unique: false,
  },
  players: [PlayerSchema],
  rounds: [RoundSchema],
  shareId: {
    required: true,
    type: String,
    unique: true,
  },
});

GameSchema.set('toObject', { virtuals: true });

export const Game: Model<IGameModel> = model<IGameModel>('Game', GameSchema);
