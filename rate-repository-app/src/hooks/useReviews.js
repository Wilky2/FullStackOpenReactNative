import { GET_REVIEWS, ME } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useReviews = (repositoryId) => {
  const repositoryReviews = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: {
      repositoryId,
    },
    skip: !repositoryId,
  });

  const meReviews = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
    variables: {
      includeReviews: true,
    },
    skip: !!repositoryId,
  });

  if (repositoryId) {
    return {
      reviews: repositoryReviews.data?.repository?.reviews,
      loading: repositoryReviews.loading,
      reviewLoading: repositoryReviews.loading,
      refetch: repositoryReviews.refetch,
    };
  }

  return {
    reviews: meReviews.data?.me?.reviews,
    loading: meReviews.loading,
    reviewLoading: meReviews.loading,
    refetch: meReviews.refetch,
  };
};

export default useReviews;
