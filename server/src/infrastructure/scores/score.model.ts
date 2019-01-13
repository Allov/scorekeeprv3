import { Document, Model, model, Schema }  from 'mongoose';
import { IScore } from './score.types';

export interface IScoreModel extends IScore, Document {

}

export const ScoreSchema = new Schema({
  playerId: String,
  points: Number,
});

export const Score: Model<IScoreModel> = model<IScoreModel>('Score', ScoreSchema);
