const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolvers");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const User = require("./models/User");

const startServer = async () => {
  const app = express();
  require("dotenv").config();
  var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  app.use(bodyParser.json());

  app.use(auth);

  const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: graphQlResolver,
    context: ({ req, res }) => ({ req, res }),
  });
  app.use(cookieParser());

  app.use(async (req, res, next) => {
    const accessToken = req.cookies["access_token"];
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken && !accessToken) {
      return next();
    }

    try {
      const data = jwt.verify(accessToken, process.env.SECRET_KEY);
      req.userId = data.userId;
      req.isAuth = true;
      return next();
    } catch (err) {}
    if (!refreshToken) {
      return next();
    }

    let data;
    try {
      data = jwt.verify(refreshToken, process.env.SECRET_KEY);
      // req.userId = data.userId;
      // req.isAuth = true;
      // return next();
    } catch (err) {
      return next();
    }
    const user = await User.findById(data.userId);
    // invalid token
    if (user._id !== data.userId) {
      return next();
    }

    const { access_token, refresh_token } = createTokens(user);
    res.cookie("refresh_token", refresh_token, {
      maxAge: 60 * 60 * 24 * 7 * 1000,
    });
    res.cookie("access_token", access_token, { maxAge: 60 * 15 * 1000 });

    next();
  });

  server.applyMiddleware({ app, cors: false });

  const PORT = process.env.PORT || 8080;
  const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@medium-api.mrq0a.mongodb.net/medium?retryWrites=true&w=majority`;
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
};

startServer();
