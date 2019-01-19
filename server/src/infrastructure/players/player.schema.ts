import { gql } from 'apollo-server-express';

export const playerTypeDefs = gql`
  type Player {
    id: ID!
    name: String!
    game: Game
    scores: [Score!]!
    user: User
    totalScore: Int
  }

  input PlayerInput {
    name: String!
    userId: ID
    gameId: ID
  }

  extend type Mutation {
    addPlayerToGame(input: PlayerInput!): Player
    updatePlayer(id: String!, input: PlayerInput!): Player
    deletePlayer(id: String!, gameId: String!): Game
  }
`;
