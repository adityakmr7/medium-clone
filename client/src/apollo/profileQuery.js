import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query profile {
    userProfile {
      username
      url
      bio
      firstName
      lastName
      profilePic
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $firstName: String!
    $lastName: String
    $username: String!
    $bio: String!
    $profilePic: String!
    $url: String!
  ) {
    updateProfile(
      profileInput: {
        firstName: $firstName
        username: $username
        lastName: $lastName
        bio: $bio
        profilePic: $profilePic
        url: $url
      }
    ) {
      firstName
      lastName
      username
      bio
      profilePic
    }
  }
`;
