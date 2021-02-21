import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation signUpUser($email: String!, $username: String!, $password: String!) {
    signUpUser(
      userInput: { email: $email, username: $username, password: $password }
    ) {
      email
      username
      _id
    }
  }
`;

export const LOGIN_USER = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      access_token
      refresh_token
      userId
    }
  }
`;
