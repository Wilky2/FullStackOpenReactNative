import { gql } from "@apollo/client";

const REPOSITORY_DETAIL = gql`
  fragment RepositoryDetail on Repository {
    id
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
  }
`;

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          ...RepositoryDetail
        }
      }
    }
  }

  ${REPOSITORY_DETAIL}
`;

export const GET_REPOSITORY = gql`
  query GET_REPOSITORY($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetail,
      url
    }
  }

  ${REPOSITORY_DETAIL}
`;

export const GET_REVIEWS = gql`
  query GET_REVIEWS($repositoryId: ID!) {
    repository(id: $repositoryId) {
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;