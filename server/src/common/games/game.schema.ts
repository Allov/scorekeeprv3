import Game from './game.model';
import UserRepository from '../users/user.model';
import { gql } from 'apollo-server-express';
import sillyname from 'sillyname';

export const gameTypeDefs = gql`
  type Game {
    id: ID!
    name: String!
    shareId: String!
    createdBy: User!
  }
  input GameFilterInput {
    limit: Int
  }

  extend type Query {
    games(filter: GameFilterInput): [Game]
    game(id: String!): Game
  }

  input GameInput {
    name: String
    userId: String
  }
  # Extending the root Mutation type.
  extend type Mutation {
    addGame(input: GameInput!): Game
    editGame(id: String!, input: GameInput!): Game
    deleteGame(id: String!): Game
  }
`;




export const gameResolvers = {
  Query: {
    games: async (_, { filter = {} }) => {
      const games: any[] = await Game.find({}, null, filter);
      return games;
    },
    game: async (_, { id }) => {
      const game: any = await Game.findById(id);
      return game;
    },
  },
  Mutation: {
    addGame: async (_, { input }) => {
      let user : any;
      if(input.userId){
        user = await UserRepository.findById(input.userId);
      } else {
        user = await UserRepository.create({username: `${sillyname()}`.replace(/ /g, '-')});
      }

      console.log('hello user: ', user);

      input.createdAt = Date.now();
      input.shareId = `${sillyname()}${sillyname()}`.replace(/ /g, '-').toLowerCase();
      input.createdBy = user.id;
      const game: any = await Game.create(input);
      user.games = [game.id];
      user = await UserRepository.findByIdAndUpdate(user.id, user);
      return game;
    },
    editGame: async (_, { id, input }) => {
      const game: any = await Game.findByIdAndUpdate(id, input);
      return game;
    },
    deleteGame: async (_, { id }) => {
      const game: any = await Game.findByIdAndRemove(id);
      return game ? game : null;
    },
  },
  Game: {
    createdBy: async(game: any) => {
      const user: any = await UserRepository.findById(game.createdBy);
      return user;
    },
  }
};
