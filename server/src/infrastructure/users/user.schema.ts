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
    createUser(input: UserInput!): User
    updateUser(id: String!, input: UserInput!): User
  }
`;
