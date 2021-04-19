const { buildSchema } = require("graphql");
const { gql } = require("apollo-server-express");

module.exports = gql`
  type Post {
    _id: ID!
    title: String!
    content: String!
    imageUrl: String!
    creator: User!
    createdAt: String!
    updatedAt: String!
    slug:String!
  }
  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }
  type Profile {
    _id: ID!
    firstName: String!
    lastName: String!
    bio:String!
    profilePic: String!
    username: String!
    url: String!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    status: String!
    posts: [Post!]!
    profile: Profile
  }
  input signupInput {
    username: String!
    email: String!
    password: String!
  }
  type AuthData {
    access_token: String!
    refresh_token: String!
    userId: ID!
  }
  input postInputData {
    title: String!
    imageUrl: String!
    content: String!
  }
  input profileInputData {
    firstName: String!
    lastName: String!
    bio:String
    profilePic: String
    username: String
    url: String
  }
  type ProfileData {
    _id: ID!
    username:String
    url:String
    bio: String
    firstName: String
    lastName:String
    createdAt: String!
    updatedAt: String! 
  }
  type Query {
    login(email: String, password: String): AuthData!
    posts: PostData
    postsByUser:PostData
    userProfile: ProfileData
    getPostDetail(_id: String): Post
  }
  type Mutation {
    signUpUser(userInput: signupInput): User!
    createPost(postInput: postInputData): Post!
    updateProfile(profileInput: profileInputData) : Profile!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
