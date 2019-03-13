import DataLoader from 'dataloader';
import { Types } from 'mongoose';
import { User as UserRepository } from './user.model';
import { IUser } from './user.types';

type BatchUser = (ids: string[]) => Promise<IUser[]>;


const batchUsers: BatchUser = async (ids) => {
  const objectIds = ids.map(id => new Types.ObjectId(id));
  const games = await UserRepository.find({
    '_id': { $in: objectIds }
  });

  const gameMap: { [key: string]: IUser } = {};
  games.forEach(game => {
    gameMap[game.id] = game;
  });


  return ids.map(id => gameMap[id]);
};

export const userLoader = () => new DataLoader<string, IUser>(batchUsers);
