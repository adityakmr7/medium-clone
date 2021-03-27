const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "I am new!",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    profile: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);