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
        slug
        creator {
          _id
          username
        }
      }
      totalPosts
    }
  }
`;

export const GET_POST_BY_USER = gql`
  query postsByUser {
    posts {
      posts {
        title
        _id
        imageUrl
        content
        createdAt
        updatedAt
        slug
        creator {
          _id
          username
        }
      }
      totalPosts
    }
  }
`;
