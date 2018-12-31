import mongoose from 'mongoose';

/**
 * Here is the our user schema which will be used to
 * validate the data sent to our database.
 */

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

/**
 * Finally, we compile the schema into a model which we then
 * export to be used by our GraphQL resolvers.
 */
export default mongoose.model('Game', gameSchema);
