import { gql } from 'apollo-server-express';

export const scoreTypeDefs = gql`
  type Score {
    points: Int!
    player: [Player]
  }

  input ScoreInput {
    playerId: String!,
    points: Int!,
  }

  extend type Mutation {
    addScoresToRound(gameId: String!, roundId: String!, input: [ScoreInput!]!): Round
    updateScore(id: String!, gameId: String!, roundId: String! , input: ScoreInput!): Round
    deleteScore(id: String!, gameId: String!, roundId: String!): Game
  }
`;
