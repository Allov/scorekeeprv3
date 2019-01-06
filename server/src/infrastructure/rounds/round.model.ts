import mongoose from 'mongoose';

export const Score = new mongoose.Schema({
  playerId: String,
  points: Number,
});

export const Round = new mongoose.Schema({
  roundNumber: Number,
  scores: [Score]
})
