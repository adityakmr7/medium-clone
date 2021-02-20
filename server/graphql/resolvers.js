const User = require("../models/User");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const Post = require("../models/Post");

module.exports = {
  login: async ({ email, password }, req) => {
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

    const access_token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );
    const refresh_token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
      },
      process.env.SECRET_KEY,
      {expiresIn: "7d"}

    )


    return {
      access_token: access_token,
      refresh_token: refresh_token,
      userId: user._id.toString(),
    };
  },
  signUpUser: async ({ userInput }, req) => {
    const { email, username, password } = userInput;
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({
        message: "Invalid Email",
      });
    }
    // if (
    //   !validator.isEmpty(password) ||
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
  getAllPost: async (args, req) => {
    const post = await Post.find();
    return {
      ...post._doc, 
    }
  },
  createPost: async ({ postInput }, req) => {
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
};
