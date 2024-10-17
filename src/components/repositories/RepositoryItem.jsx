import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RepositoryStats} from './RepositoryComponents';
import { RepositoryHeader } from './RepositoryComponents';


const RepositoryItem = ({ repository }) => {
  return (
    <View testID="repositoryItem" style={styles.repositoryItem}>
      <RepositoryHeader
        fullName={repository.fullName}
        description={repository.description}
        ownerAvatarUrl={repository.ownerAvatarUrl}
        language={repository.language}
      />
      <RepositoryStats
        stars={repository.stargazersCount}
        forks={repository.forksCount}
        reviews={repository.reviewCount}
        rating={repository.ratingAverage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  repositoryItem: {
    backgroundColor: 'white',
    padding: 15,
  },
  
});


export default RepositoryItem;
