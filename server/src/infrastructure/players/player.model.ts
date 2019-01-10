import mongoose from 'mongoose';

export const Player = new mongoose.Schema({
  archived: {type: Boolean, default: false},
  name: String,
})
