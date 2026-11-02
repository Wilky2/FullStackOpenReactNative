import { GET_REVIEWS } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useReviews = (repositoryId) => {
  const { data, loading } = useQuery(GET_REVIEWS, {
     fetchPolicy: 'cache-and-network',
     variables: {
        repositoryId
     } 
  });

  return { reviews: data?.repository.reviews, loading };
};

export default useReviews;