const { graphqlHTTP } = require("express-graphql");
const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolvers");
const {ApolloServer, gql} = require('apollo-server-express');
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const auth = require("./middleware/auth");

const app = express();
require('dotenv').config();
app.use(bodyParser.json());
app.use(auth);

const server = new ApolloServer({
  typeDefs: graphQlSchema,
  resolvers: graphQlResolver,
  context: ({req,res}) => ({req,res})
})
app.use(cookieParser());



server.applyMiddleware({app});

// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphQlSchema,
//     rootValue: graphQlResolver,
//     graphiql: true,
//     customFormatErrorFn(err) {
//       if(!err.originalError) {
//         return err;
//       }
//       const data = err.originalError.data;
//       const message  = err.message || 'An Error occurred';
//       const code = err.originalError.code ||500;
//       return {
//         message,
//         status:code,
//         data,
//       }
//     }
//   })
// );

const PORT = process.env.PORT || 8080;
const URL =`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@medium-api.mrq0a.mongodb.net/medium?retryWrites=true&w=majority`; 
mongoose
  .connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((res) => {
    app.listen(PORT, () => {
      console.info(`App is running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Error" + err);
  });
