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
    url
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
      ...RepositoryDetail
    }
  }

  ${REPOSITORY_DETAIL}
`;

export const ME = gql`
    query {
        me {
            id
            username
        }
    }
`;