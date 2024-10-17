import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES, GET_REPOSITORY } from '../graphql/queries';

export const useRepository = ( repositoryId ) => {

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { repositoryId: repositoryId.id },
  });
  const repository = data?.repository;

  return { repository, loading, error, refetch };

}

const useRepositories = (orderDirection, orderBy, searchQuery) => {
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { orderDirection, orderBy, searchKeyword: searchQuery },
  });

  const repositories = data?.repositories;

  return { repositories, loading, error, refetch };
};

export default useRepositories;