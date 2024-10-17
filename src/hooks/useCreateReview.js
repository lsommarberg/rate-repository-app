import { useMutation } from '@apollo/client';
import { CREATE_REVIEW, DELETE_REVIEW } from '../graphql/mutations';
import { GET_REPOSITORIES, USER } from '../graphql/queries';


export const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW, {
    refetchQueries: [{ query: GET_REPOSITORIES }],
  });

  const deleteReview = async (id) => {
    const { data } = await mutate({ variables: { id } });
    return data;
  };

  return [deleteReview, result];
};

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW, {
    refetchQueries: [{ 
      query: USER, 
      variables: { includeReviews: true } 
    }],
  });

  const createReview = async ({ ownerName, repositoryName, rating, text }) => {
    const parsedRating = parseInt(rating, 10);

    const { data } = await mutate({
      variables: {
        review: {
          repositoryName,
          ownerName,
          rating: parsedRating,
          text,
        },
      },
    });
    return data;
  };

  return [createReview, result];
};

export default useCreateReview;