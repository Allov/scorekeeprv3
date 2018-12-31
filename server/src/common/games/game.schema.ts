import Game from './game.model';
import { gql } from 'apollo-server-express';


export const gameTypeDefs = gql`
  type Game {
    id: ID!
    name: String!
    shareId: String!
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
    shareId: String
  }
  # Extending the root Mutation type.
  extend type Mutation {
    addUser(input: GameInput!): Game
    editUser(id: String!, input: GameInput!): Game
    deleteUser(id: String!): Game
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
    addUser: async (_, { input }) => {
      input.createdAt = Date.now();
      const game: any = await Game.create(input);
      return game;
    },
    editUser: async (_, { id, input }) => {
      const game: any = await Game.findByIdAndUpdate(id, input);
      return game;
    },
    deleteUser: async (_, { id }) => {
      const game: any = await Game.findByIdAndRemove(id);
      return game ? game : null;
    },
  },
};
