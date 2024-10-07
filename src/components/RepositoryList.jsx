import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import Text from './Text';
import useRepositories from '../hooks/useRepositories';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});


const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const { repositories, loading, error } = useRepositories();

  if (error) {
    return <Text fontWeight="bold" fontSize="subheading">Error: {error.message}</Text>;
  }


  if (loading) {
    return <Text fontWeight="bold" fontSize="subheading">Loading...</Text>;
  }


  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];
    

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => <RepositoryItem repository={item} />} 
    />
  );
};

export default RepositoryList;
