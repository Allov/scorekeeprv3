import { gql } from 'apollo-server-express';

export const userTypeDefs = gql `
  type User {
    id: ID!
    username: String!
    games: [Game!]!
  }

  extend type Query {
    user(id: String!): User
  }

  input UserInput {
    username: String
  }

  extend type Mutation {
    userCreate(input: UserInput!): User
    userEdit(id: String!, input: UserInput!): User
  }
`;
