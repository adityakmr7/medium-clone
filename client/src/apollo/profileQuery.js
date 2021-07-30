import { gql } from "@apollo/client";

export const GET_PROFILE = gql`
  query profile {
    userProfile {
      username
      url
      bio
      name
      profilePic
    }
  }
`;
export const UPDATE_PROFILE = gql`
  mutation updateProfile(
    $name: String!
    $username: String!
    $bio: String!
    $profilePic: String!
    $url: String!
  ) {
    updateProfile(
      profileInput: {
        name: $name
        username: $username
        bio: $bio
        profilePic: $profilePic
        url: $url
      }
    ) {
      name
      username
      bio
      profilePic
    }
  }
`;
