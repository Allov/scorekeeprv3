import { gql } from 'apollo-server-express';

export const playerTypeDefs = gql`
  type Player {
    id: ID!
    name: String!
    game: Game
    scores: [Score!]!
    user: User
  }

  input PlayerInput {
    name: String!
    userId: ID
  }

  extend type Mutation {
    addPlayerToGame(gameId: String!, input: PlayerInput!): Player
    updatePlayer(id: String!, gameId: String!, input: PlayerInput!): Player
    deletePlayer(id: String!, gameId: String!): Game
  }
`;
