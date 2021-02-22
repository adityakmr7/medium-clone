import { gql } from "@apollo/client";

export const GET_ALL_POST = gql`
  query posts {
    posts {
      posts {
        title
        _id
        imageUrl
        content
        createdAt
        updatedAt
      }
      totalPosts
    }
  }
`;
