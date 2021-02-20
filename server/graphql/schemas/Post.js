module.exports.PostSchema = `
    type Post {
        _id: ID!
        title:String!
        content:String!
        imageUrl: String!
        creator:User!
        createdAt:String!
        updatedAt:String!
    }

`
