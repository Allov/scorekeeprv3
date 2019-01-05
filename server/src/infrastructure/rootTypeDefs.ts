import { gql } from 'apollo-server-express';
import { gameTypeDefs } from './games/game.schema';
import {userTypeDefs} from './users/user.schema';


const rootTypeDefs = gql`
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [rootTypeDefs, gameTypeDefs, userTypeDefs];