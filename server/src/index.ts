import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';
import morgan from 'morgan';
import ScorekeeprContext from './app/context';
import resolvers from './infrastructure/resolvers';
import rootTypeDefs from './infrastructure/rootTypeDefs';

mongoose.connect(
  'mongodb://localhost/scorekeepr',
  { useNewUrlParser: true }
);

const schema = makeExecutableSchema({
  resolvers,
  typeDefs: rootTypeDefs,
});

const apolloServer = new ApolloServer({
  context: () => new ScorekeeprContext(),
  schema,
  tracing: true,
  formatError(error: any) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // logging the errors can help in development
      // tslint:disable-next-line:no-console
      console.log(error);
    }
    return error;
  },
});

const app = express();
app.use(cors());
app.use(morgan('dev'));
apolloServer.applyMiddleware({ app });

const port = 4000;

const httpServer = createServer(app);
apolloServer.installSubscriptionHandlers(httpServer);

httpServer.listen({ port }, () => {
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:${port}${apolloServer.graphqlPath}`);
  // tslint:disable-next-line:no-console
  console.log(`🚀 Subscriptions ready at ws://localhost:${port}${apolloServer.subscriptionsPath}`);
});
