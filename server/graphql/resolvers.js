const { getPost, createNewPost,getPostByUser } = require("./resolvers/postResolver")
const { loginUser, registerUser } = require("./resolvers/userResolver");
const { updateUserProfile, getUserProfile } = require("./resolvers/profileResolver");

module.exports = {
  Query: {
    posts: getPost,
    login: loginUser,
    postsByUser: getPostByUser,
    userProfile: getUserProfile
  },
    Mutation: {
      signUpUser: registerUser,
      updateProfile: updateUserProfile,
      createPost: createNewPost,
    },
  }

