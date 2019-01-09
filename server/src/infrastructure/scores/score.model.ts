import mongoose from 'mongoose';

export const Score = new mongoose.Schema({
  playerId: String,
  points: Number,
});
