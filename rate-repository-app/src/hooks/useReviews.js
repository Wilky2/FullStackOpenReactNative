import { GET_REVIEWS, ME } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useReviews = (repositoryId) => {
   if(repositoryId) {
      const { data, loading } = useQuery(GET_REVIEWS, {
         fetchPolicy: 'cache-and-network',
         variables: {
            repositoryId
         } 
      });

      return { reviews: data?.repository.reviews, loading };
   }

   const { data, loading } = useQuery(ME, {
      fetchPolicy: 'cache-and-network',
      variables: {
         includeReviews: true
      }
   });

   return {reviews : data?.me.reviews, loading};
   
};

export default useReviews;