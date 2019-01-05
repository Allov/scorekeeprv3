import mongoose from 'mongoose';

const User = new mongoose.Schema({
  username: String,
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }]
});

User.set('toObject', {virtuals: true});

export default mongoose.model('User', User);
