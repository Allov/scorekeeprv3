import DataLoader from 'dataloader';
import { Types } from 'mongoose';
import { Game as GameRepository } from './game.model';
import { IGame } from './game.types';

type BatchGame = (ids: string[]) => Promise<IGame[]>;


const batchGames: BatchGame = async (ids) => {
  const objectIds = ids.map(id => new Types.ObjectId(id));
  const games =  await GameRepository.find({
    '_id': { $in: objectIds }
  }, (err, docs) => {
    console.log(docs);
  });

  const gameMap : { [key: string]: IGame } = {};
  games.forEach(game => {
    gameMap[game.id] = game;
  });


  return ids.map(id => gameMap[id]);
};

export const gameLoader = () => new DataLoader<string, IGame>(batchGames);
