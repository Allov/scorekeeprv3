import mongoose from 'mongoose';
import { Score } from '../scores/score.model';

export const Round = new mongoose.Schema({
  roundNumber: Number,
  scores: [Score]
})
