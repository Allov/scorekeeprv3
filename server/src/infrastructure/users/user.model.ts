import mongoose from 'mongoose';

const User = new mongoose.Schema({
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  username: String,
});

User.set('toObject', {virtuals: true});

export default mongoose.model('User', User);
