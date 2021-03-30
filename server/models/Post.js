const mongoose = require("mongoose");
const slug = require('slug');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      slug:"title"
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

postSchema.pre('validate', function (next) {
  if (this.title) {
    this.slugify();
  }
  next();
})
postSchema.methods.slugify = function () {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
}


module.exports = mongoose.model("Post", postSchema);