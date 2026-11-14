import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

const getOrderVariables = (option) => {
  switch (option) {
    case 'Highest rated repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'Lowest rated repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    case 'Latest repositories':
    default:
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
  }
};

const RepositoryList = () => {
  const [selectedOption, setSelectedOption] = useState('Latest repositories');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

  const orderVariables = getOrderVariables(selectedOption);

  const { repositories } = useRepositories({
    ...orderVariables,
    searchKeyword: debouncedSearchKeyword,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOption={selectedOption}
      setSelectedOption={setSelectedOption}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
    />
  );
};

export default RepositoryList;
