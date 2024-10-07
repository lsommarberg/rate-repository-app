import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          description
          forksCount
          fullName
          language
          ownerAvatarUrl
          ratingAverage
          reviewCount
          stargazersCount
          id
        }
      }
    }
  }
`;

export const USER = gql`
  query {
    me {
      id
      username
    }
  }
`;


