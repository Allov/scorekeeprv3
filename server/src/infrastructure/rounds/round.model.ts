import { Document, Model, model, Schema }  from 'mongoose';
import { ScoreSchema } from '../scores/score.model';
import { IRound } from './round.types';

export interface IRoundModel extends IRound, Document {

}

export const RoundSchema = new Schema({
  roundNumber: Number,
  scores: [ScoreSchema]
});

export const Round: Model<IRoundModel> = model<IRoundModel>('Round', RoundSchema);
