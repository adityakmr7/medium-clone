const { buildSchema } = require("graphql");
const { AuthSchema } = require("./schemas/Auth");
const { PostSchema } = require("./schemas/Post");

module.exports = buildSchema(`
    ${PostSchema}
    ${AuthSchema}
    input postInputData {
        title:String!
        imageUrl:String!
        content:String!
    }
    type RootQuery {
        login(email:String, password:String): AuthData!
        getAllPost: Post! 
    }
    type RootMutation { 
        signUpUser(userInput: signupInput): User!
        createPost(postInput:postInputData): Post!
    }
    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
