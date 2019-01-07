import UserRepository from '../users/user.model';
import Game from './game.model';

import sillyname from 'sillyname';

export const gameResolvers = {
  Game: {
    createdBy: async(game: any) => {
      const user: any = await UserRepository.findById(game.createdBy);
      return user;
    },
    players: async(game: any) => {
      return game.players.filter((x: any) => !x.archived);
    }
  },
  Mutation: {
    createGame: async (_, { input }) => {
      let user : any;
      if(input.userId){
        user = await UserRepository.findById(input.userId);
      } else {
        user = await UserRepository.create({username: `${sillyname()}`.replace(/ /g, '-')});
      }

      input.createdAt = Date.now();
      input.shareId = `${sillyname()}${sillyname()}`.replace(/ /g, '-').toLowerCase();
      input.createdBy = user.id;
      input.rounds = [];
      const game: any = await Game.create(input);
      user.games = [game.id];
      user = await UserRepository.findByIdAndUpdate(user.id, user);
      return game;
    },
    deleteGame: async (_, { id }) => {
      const game: any = await Game.findByIdAndRemove(id);
      return game ? game : null;
    },
    editGame: async (_, { id, input }) => {
      const game: any = await Game.findByIdAndUpdate(id, input);
      return game;
    },
  },
  Query: {
    game: async (_, { id }) => {
      const game: any = await Game.findById(id);
      return game;
    },
    gameByShareId: async (_, { shareId }) => {
      const game: any = await Game.findOne({ shareId });
      return game;
    },
    games: async (_, { filter = {} }) => {
      const games: any[] = await Game.find({}, null, filter);
      return games;
    },
  },
};
