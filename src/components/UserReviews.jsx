import { useQuery } from '@apollo/client';
import { USER } from '../graphql/queries';
import { View, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { format, parseISO } from "date-fns";
import theme from '../theme';
import Text from './Text';
import { useNavigate } from 'react-router-native';
import { useDeleteReview } from '../hooks/useCreateReview';

const ItemSeparator = () => <View style={styles.separator} />;

export const styles = StyleSheet.create({
    container: {
      padding: 15,
      backgroundColor: theme.colors.white,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.mainBackground,
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
      viewButton: {
        backgroundColor: theme.colors.primary,
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      deleteButton: {
        backgroundColor: "red",
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        width: '45%',
      },
      buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
      }
    });


const ReviewItem = ({ review, refetch }) => {
    const date = parseISO(review.createdAt);
    const formattedDate = format(date, 'd.M.yyyy');
    const navigate = useNavigate();
    const [deleteReview] = useDeleteReview();

    const handleDelete = (reviewId) => {
        Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
            {
            text: "Cancel",
            style: "cancel"
            },
            { 
            text: "Delete", 
            onPress: async () => {
                try {
                await deleteReview(reviewId);
                refetch();
                } catch (e) {
                console.error("Failed to delete review:", e);
                }
            }
            }
        ]
        );
    };

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
                {review.repository.fullName}
            </Text>
            <Text color="textSecondary">{formattedDate}</Text>
            <Text>{review.text}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <Pressable onPress={() => navigate(`/${review.repositoryId}`)} style={styles.viewButton}>
            <Text color="white" fontSize="subheading">View Repository</Text>
            </Pressable>
            <Pressable onPress={() => handleDelete(review.id)} style={styles.deleteButton}>
            <Text color="white" fontSize="subheading">Delete Review</Text>
            </Pressable>
        </View>
      </View>
    );
  };

const UserReviews = () => {

    const { data, loading, error, refetch } = useQuery(USER, {
      variables: { includeReviews: true },
    });
  
    if (loading) {
      return <Text>Loading...</Text>;
    }
  
    if (error) {
      return <Text>Error: {error.message}</Text>;
    }
    
    const reviews = data?.me?.reviews;

    const reviewNodes = reviews
      ? reviews.edges.map((edge) => edge.node)
      : [];

    return (
        <FlatList
        data={reviewNodes}
        renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
        keyExtractor={({ id }) => id}
        ItemSeparatorComponent={ItemSeparator}
        />
      );
  };

export default UserReviews;
