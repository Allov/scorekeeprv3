import Game from './game.model';
import { gql } from 'apollo-server-express';

/**
 * Export a string which contains our GraphQL type definitions.
 */
export const gameTypeDefs = gql`
  type Game {
    id: ID!
    name: String!
    shareId: String!
  }
  input GameFilterInput {
    limit: Int
  }
  # Extending the root Query type.
  extend type Query {
    games(filter: GameFilterInput): [Game]
    game(id: String!): Game
  }
  # We do not need to check if any of the input parameters
  # exist with a "!" character. This is because mongoose will
  # do this for us, and it also means we can use the same
  # input on both the "addUser" and "editUser" methods.
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

/**
 * Exporting our resolver functions. Note that:
 * 1. They can use async/await or return a Promise which
 *    Apollo will resolve for us.
 * 2. The resolver property names match exactly with the
 *    schema types.
 */
export const gameResolvers = {
  Query: {
    games: async (_, { filter = {} }) => {
      const games: any[] = await Game.find({}, null, filter);
      // notice that I have ": any[]" after the "users" variable?
      // That is because I am using TypeScript but you can remove
      // this and it will work normally with pure JavaScript
      return games;
    },
    game: async (_, { id }) => {
      const game: any = await Game.findById(id);
      return game;
    },
  },
  Mutation: {
    addUser: async (_, { input }) => {
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
