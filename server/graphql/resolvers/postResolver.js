const Post = require("../../models/Post");
const validator = require("validator");
const User = require("../../models/User");

const getPost = async (args, req) => {
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
}

// Find Posts by user id 
const getPostByUser = async (parent,_, {req}) => {
    console.log(req.isAuth);
    if (!req.isAuth) {
        const error = new Error('Not Authenticated');
        error.code = 401;
        throw error;
    }
    const posts = await Post.find({ creator: req.userId }).sort({createdAt : -1}).populate('creator');
    const postsCount = await Post.find({ creator: req.userId }).countDocuments();
  
     return {
        posts: posts.map((p) => {
          return {
            ...p._doc,
            _id: p._id.toString(),
            createdAt: p.createdAt.toISOString(),
            updatedAt: p.updatedAt.toISOString(),
          };
        }),
        totalPosts:postsCount
      }
}
const createNewPost = async (parent, { postInput }, { req }) => {
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
};
module.exports =  {getPost,createNewPost,getPostByUser}