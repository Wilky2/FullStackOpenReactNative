import { GET_REPOSITORIES } from '../graphql/queries';
import { useQuery } from '@apollo/client/react';

const useRepositories = (variables, orderDirection, searchKeyword) => {
  let queryVariables = {};

  if (typeof variables === 'string') {
    queryVariables = {
      orderBy: variables,
      orderDirection,
      searchKeyword,
    };
  } else if (typeof variables === 'object' && variables !== null) {
    queryVariables = variables;
  }

  const { data, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: queryVariables,
  });

  return { repositories: data?.repositories, loading, refetch };
};

export default useRepositories;
