import { gql } from 'apollo-server-express';

export const scoreTypeDefs = gql`
  type Score {
    points: Int!,
    player: Player,
  }

  input ScoresInput {
    filter: ScoreFilterInput!,
    scores: [ScoreInput!]!,
  }

  input ScoreInput {
    playerId: String!,
    points: Int!,
  }

  input ScoreFilterInput {
    gameId: String!,
    roundId: String!,
  }

  extend type Mutation {
    addScoresToRound(input: ScoresInput!): Game
    updateScores(input: ScoresInput!): Game
    deleteScore(id: String!, filter: ScoreFilterInput): Game
  }
`;
