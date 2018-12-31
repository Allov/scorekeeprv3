import mongoose from 'mongoose';

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
  }
});

gameSchema.set('toObject', {virtuals: true});

export default mongoose.model('Game', gameSchema);
