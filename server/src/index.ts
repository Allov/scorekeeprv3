import express from 'express';
import cors from 'cors';
import { ApolloServer, gql, makeExecutableSchema } from 'apollo-server-express';
import { gameResolvers, gameTypeDefs} from './common/games/game.schema';
import mongoose from 'mongoose';

mongoose.connect(
  'mongodb://localhost/scorekeepr',
  { useNewUrlParser: true }
);


// Construct a schema, using GraphQL schema language
const rootTypeDefs = gql`
  type Query
  type Mutation
  schema {
    query: Query
    mutation: Mutation
  }
`;

// Provide resolver functions for your schema fields

const typeDefs = [rootTypeDefs, gameTypeDefs];
const resolvers = [gameResolvers];

const schema = makeExecutableSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});

const server = new ApolloServer({
  schema,
  formatError(error) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // logging the errors can help in development
      console.log(error);
    }
    return error;
  },
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
