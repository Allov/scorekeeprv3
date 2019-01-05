import { gql } from 'apollo-server-express';

export const roundTypeDefs = gql`
  type Score {
    points: Int!
  }

  input ScoreInput {
    playerId: ID!,
    score: Int!,
  }

  type Round {
    id: ID!
    roundNumber: Int!
    game: Game!
    scores: [Score!]!
  }

  input RoundInput {
    gameId: ID!
    scores: [ScoreInput!]!
  }

  extend type Mutation {
    addRoundToGame(input: RoundInput!): Round
    updateRound(id: String!, input: RoundInput!): Round
    deleteRound(id: String!, gameId: String!): Game
  }
`;
