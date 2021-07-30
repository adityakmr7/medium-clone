const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    profilePic: {
      type: String,
    },
    username: {
      type: String,
    },
    url: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
profileSchema.plugin(uniqueValidator, { message: "is already taken." });

profileSchema.pre("validate", function (next) {
  this.urlIfy();
  next();
});
profileSchema.methods.urlIfy = function () {
  this.url = `/@${this.username}`;
};

module.exports = mongoose.model("Profile", profileSchema);
