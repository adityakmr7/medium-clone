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
  }
  type PostData {
    posts: [Post!]!
    totalPosts: Int!
  }
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    status: String!
    posts: [Post!]!
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

  type Query {
    login(email: String, password: String): AuthData!
    posts: PostData
  }
  type Mutation {
    signUpUser(userInput: signupInput): User!
    createPost(postInput: postInputData): Post!
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;
