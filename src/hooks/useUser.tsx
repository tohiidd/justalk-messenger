import {gql, useLazyQuery, useMutation, useQuery} from "@apollo/client";

const REGISTER = gql`
  mutation register(
    $email: String!
    $username: String!
    $password: String!
    $avatarColor: String!
    $rememberMe: Boolean!
  ) {
    register(
      body: {
        email: $email
        username: $username
        password: $password
        avatarColor: $avatarColor
        rememberMe: $rememberMe
      }
    ) {
      access_token
      user {
        email
        username
        avatarColor
      }
    }
  }
`;
export const useRegisterUser = () => useMutation(REGISTER);

const FIND_BY_USERNAME = gql`
  query findByUsername($username: String!) {
    findByUsername(username: $username) {
      username
      email
    }
  }
`;

export const useFindByUsername = () => useLazyQuery(FIND_BY_USERNAME);
