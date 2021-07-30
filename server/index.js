const graphQlSchema = require("./graphql/schema");
const graphQlResolver = require("./graphql/resolvers");
const { ApolloServer, gql } = require("apollo-server-express");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
const User = require("./models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const startServer = async () => {
  const app = express();
  // require("dotenv").config();
  var corsOptions = {
    origin: "http://localhost:3000",
    credentials: true, // <-- REQUIRED backend setting
  };
  app.use(cors(corsOptions));
  app.use(express.json());

  app.use(auth);

  const server = new ApolloServer({
    typeDefs: graphQlSchema,
    resolvers: graphQlResolver,
    context: ({ req, res }) => ({ req, res }),
  });
  app.use(cookieParser());
  const UPLOAD_PATH = path.resolve(__dirname, "../assets/images");
  // const UPLOAD_PATH = "images";
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, UPLOAD_PATH);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + "-" + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
  );

  const clearImage = (filePath) => {
    filePath = path.join(__dirname, "..", filePath);
    fs.unlink(filePath, (err) => console.log(err));
  };

  // Save the image in file and then image link will be passed to
  // graphql image field

  app.put("/post-image", (req, res, next) => {
    console.log("pos", req);
    if (!req.file) {
      return res.status(200).json({
        message: "No file Provided",
      });
    }
    if (req.body.oldPath) {
      clearImage(req.body.oldPath);
    }
    return res
      .status(201)
      .json({ message: "File Stored", filePath: req.file.path });
  });
  // TODO:  Need to implement Refresh Token
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
  const URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_NAME}.mrq0a.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
  const TEST_URL = `mongodb+srv://adityakmr:yQgKrE5EIiZKgwsq@medium-fullstack.mrq0a.mongodb.net/medium-fullstack?retryWrites=true&w=majority`;
  mongoose
    .connect(TEST_URL, { useNewUrlParser: true, useUnifiedTopology: true })
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
