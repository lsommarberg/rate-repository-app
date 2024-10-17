import { TextInput } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useCreateReview from '../hooks/useCreateReview';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  review: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('Owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required'),
  review: yup
    .string()
});


const ReviewForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.username}
        onChangeText={formik.handleChange('ownerName')}
        style={[
          styles.input,
          formik.touched.ownerName && formik.errors.ownerName ? styles.inputError : null
        ]}
        autoCapitalize="none"
      />
      {formik.touched.ownerName && formik.errors.ownerName && ( <Text style={{ color: 'red' }}>{formik.errors.ownerName}</Text> )}
      
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        autoCapitalize="none"
        style={[
          styles.input,
          formik.touched.repositoryName && formik.errors.repositoryName ? styles.inputError : null
        ]}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && 
      ( <Text style={{ color: 'red' }}>{formik.errors.repositoryName}</Text> )}

      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        style={[
          styles.input,
          formik.touched.rating && formik.errors.rating ? styles.inputError : null
        ]}
      />
        {formik.touched.rating && formik.errors.rating && ( <Text style={{ color: 'red' }}>{formik.errors.rating}</Text> )}

      <TextInput
          placeholder='Review'
          value={formik.values.review}
          onChangeText={formik.handleChange('review')}
          style={[
          styles.input,
          formik.touched.review && formik.errors.review ? styles.inputError : null
          ]}
      />
        {formik.touched.review && formik.errors.review && ( <Text style={{ color: 'red' }}>{formik.errors.review}</Text> )}

      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontSize="subheading" fontWeight="bold" color="white">
          Create a review
        </Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useCreateReview();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, review } = values;
    try {
      const data = await createReview({ ownerName, repositoryName, rating, text: review });
      if (data && data.createReview) {
        navigate(`/${data.createReview.repositoryId}`);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return <ReviewForm onSubmit={onSubmit} />;
};

export default CreateReview;



const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: theme.colors.white,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginTop: 10,
      borderRadius: 5,
      backgroundColor: theme.colors.white,
      fontFamily: theme.fonts.main,
    },
    inputError: {
      borderColor: theme.colors.onError,
    },
    button: {
      marginTop: 10,
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
  });

/*
    Repository owner's username is a required string
    Repository's name is a required string
    Rating is a required number between 0 and 100
    Review is a optional string
*/