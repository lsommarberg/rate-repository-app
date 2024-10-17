import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { useRepository } from '../../hooks/useRepositories';
import RepositoryItem from './RepositoryItem';
import { RepositoryLink } from './RepositoryComponents';
import Text from '../Text';
import { format, parseISO } from "date-fns";
import theme from '../../theme';

const ItemSeparator = () => <View style={styles.separator} />;

export const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: theme.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.mainBackground,
    },
    header: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      marginBottom: 5,
    },
    separator: {
      height: 10,
    },
    ratingContainer: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.primary,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    reviewDetails: {
      flex: 1,
    },
    row: { 
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });


const RepositoryInfo = ( { repository }) => {

  return (
    <View style={styles.container} >
      <RepositoryItem repository={repository} />
        <RepositoryLink url={repository.url} />
    </View>
  );
};


const ReviewItem = ({ review }) => {
  const date = parseISO(review.createdAt);
  const formattedDate = format(date, 'd.M.yyyy');

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.ratingContainer}>
          <Text fontWeight="bold" fontSize="subheading" color="primary">
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewDetails}>
          <Text fontWeight="bold" fontSize="subheading">
            {review.user.username}
          </Text>
          <Text color="textSecondary">{formattedDate}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading, error } = useRepository({ id });


  if (error) {
      return <Text fontWeight="bold" fontSize="subheading">Error: {error.message}</Text>;
    }
    
  if (loading) {
    return <Text fontWeight="bold" fontSize="subheading">Loading...</Text>;
  }

  const reviews = repository.reviews.edges.map(edge => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;

