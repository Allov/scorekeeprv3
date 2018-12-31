import express from 'express';
import cors from 'cors';
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import mongoose from 'mongoose';
import rootTypeDefs from './graphql/rootTypeDefs';
import resolvers from './graphql/resolvers';

mongoose.connect(
  'mongodb://localhost/scorekeepr',
  { useNewUrlParser: true }
);


const schema = makeExecutableSchema({
  typeDefs: rootTypeDefs,
  resolvers: resolvers,
});

const server = new ApolloServer({
  schema,
  formatError(error: any) {
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
