import { gql } from "@apollo/client";

export const AUTHENTICATE = gql`
    mutation authentication($username: String!, $password: String!) {
        authenticate(credentials: {username: $username, password: $password}) {
            accessToken
        }
    }
`;

export const CREATE_REVIEW = gql`
    mutation createReview($ownerName: String!, $rating: Int!, $repositoryName: String!, $review: String!) {
        createReview(review: {ownerName: $ownerName, rating: $rating, repositoryName: $repositoryName, text: $review} ) {
            repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: {username: $username, password: $password}) {
            id,
            username
        }
    }
`;