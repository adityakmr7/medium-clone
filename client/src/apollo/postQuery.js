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
    postsByUser {
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

export const GET_POST_DETAIL = gql`
  query getPostDetail($id: String!) {
    getPostDetail(_id: $id) {
      _id
      title
      slug
      content
    }
  }
`;

export const CREATE_POST = gql`
  mutation createPost($title: String!, $content: String!, $imageUrl: String!) {
    createPost(
      postInput: { title: $title, content: $content, imageUrl: $imageUrl }
    ) {
      title
      content
      imageUrl
    }
  }
`;
