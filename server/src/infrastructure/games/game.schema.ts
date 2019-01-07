import { gql } from 'apollo-server-express';

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
    gameByShareId(shareId: String!): Game
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
