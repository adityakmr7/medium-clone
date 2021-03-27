const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const profileSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
    
      default: null,
    },
    lastName: {
      type: String,
  
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    profilePic: {
      type: String,
      default: null,
    },
    username: {
      type: String,
      default: null,
    },
    url: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
