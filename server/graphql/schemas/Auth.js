module.exports.AuthSchema = `
type User {
    _id:ID!
    username: String!
    email:String!
    password:String!
    status:String!
    posts:[Post!]!
}
input signupInput {
    username: String!
    email:String!
    password:String!
}
type AuthData {
    access_token:String!
    refresh_token:String!
    userId: ID!
}
`;
