import { Document, Model, model, Schema }  from 'mongoose';
import { IUser } from './user.types';

export interface IUserModel extends IUser, Document {

}

export const UserSchema = new Schema({
  games: [{ type: Schema.Types.ObjectId, ref: 'Game' }],
  username: String,
});

UserSchema.set('toObject', {virtuals: true});

export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);
