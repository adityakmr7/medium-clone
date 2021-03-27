const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");
const { createTokens } = require("../utils/auth");
const Profile = require("../models/Profile");

module.exports = {
  Query: {
    posts: async (args, req) => {
      const posts = await Post.find().sort({ createdAt: -1 }).populate('creator');
      const totalPosts = await Post.find().countDocuments();
      return {
        posts: posts.map((p) => {
          return {
            ...p._doc,
            _id: p._id.toString(),
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          };
        }),
        totalPosts: totalPosts,
      };
    },
    login: async (parent, { email, password }, { res }) => {
      const user = await User.findOne({ email: email });
      if (!user) {
        const error = new Error("User Not Found");
        error.code = 401;
        throw error;
      }

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        const error = new Error("Wrong Password");
        error.code = 401;
        throw error;
      }

      const { access_token, refresh_token } = createTokens(user);
      res.cookie("refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24 * 7 * 1000,
      });
      res.cookie("access_token", access_token, { maxAge: 60 * 15 * 1000 });
      return {
        access_token: access_token,
        refresh_token: refresh_token,
        userId: user._id.toString(),
      };
    },
  },
  Mutation: {
    signUpUser: async (parent, { userInput }) => {
      const { email, username, password } = userInput;
      const errors = [];
      if (!validator.isEmail(email)) {
        errors.push({
          message: "Invalid Email",
        });
      }
      // if (
      //   validator.isEmpty(password) ||
      //   validator.isLength(password, { min: 5 })
      // ) {
      //   errors.push({
      //     message: "Enter a Valid Password",
      //   });
      // }
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        const error = new Error("User exists already");
        throw error;
      }
      if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = 402;
        throw error;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        email: email,
        password: hashedPassword,
        username: username,
      });
      
      const createdUser = await user.save();
      
      return {
        ...createdUser._doc,
        _id: createdUser._id.toString(),
      };
    },

    updateProfile: async (parent, { profileInput }, { req }) => {
      const {firstName,
        lastName,
        bio,
        profilePic,
        username,
        url } = profileInput;
      
    },  
    /**
     * Create User Post
     */
    createPost: async (parent, { postInput }, { req }) => {
      if (!req.isAuth) {
        const error = new Error("Not Authenticated");
        error.code = 401;
        throw error;
      }
      const { title, content, imageUrl } = postInput;
      const errors = [];
      if (validator.isEmpty(title) || !validator.isLength(title, { min: 4 })) {
        errors.push({ message: "Title is invalid" });
      }

      if (errors.length > 0) {
        const error = new Error("Invalid Input");
        error.data = errors;
        error.code = 402;
        throw error;
      }
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error("Invalid User");
        error.code = 401;
        throw error;
      }
      const post = new Post({
        title,
        content,
        imageUrl,
        creator: user,
      });

      const createdPost = await post.save();
      user.posts.push(createdPost);
      await user.save();
      return {
        ...createdPost._doc,
        _id: createdPost._id.toString(),
        createdAt: createdPost.createdAt.toString(),
        updatedAt: createdPost.updatedAt.toString(),
      };
    },
  },
};
