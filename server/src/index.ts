
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
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

const server = new ApolloServer({
  schema,
  formatError(error: any) {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // logging the errors can help in development
      // tslint:disable-next-line:no-console
      console.log(error);
    }
    return error;
  },
  // formatResponse(response: any) {
  //   if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  //     // tslint:disable-next-line:no-console
  //     console.log(response);
  //   }
  //   return response;
  // },
});

const app = express();
app.use(cors());
app.use(morgan('dev'));
server.applyMiddleware({ app });

const port = 4000;

app.listen({ port }, () =>
  // tslint:disable-next-line:no-console
  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`),
);
