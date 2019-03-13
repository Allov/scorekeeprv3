import { Document, Model, model, Schema } from 'mongoose';
import { IPlayer } from './player.types';

export interface IPlayerModel extends IPlayer, Document {

}

export const PlayerSchema = new Schema({
  archived: {type: Boolean, default: false},
  name: String,
});

export const Player: Model<IPlayerModel> = model<IPlayerModel>('Player', PlayerSchema);
