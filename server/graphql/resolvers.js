const { getPost, createNewPost,getPostByUser } = require("./resolvers/postResolver")
const { loginUser, registerUser } = require("./resolvers/userResolver");
const { updateUserProfile } = require("./resolvers/profileResolver");

module.exports = {
  Query: {
    posts: getPost,
    login: loginUser,
    postsByUser: getPostByUser,
  },
    Mutation: {
      signUpUser: registerUser,

      updateProfile: updateUserProfile,
  
      createPost: createNewPost,
    },
  }

