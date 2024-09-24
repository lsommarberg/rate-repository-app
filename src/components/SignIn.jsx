import { TextInput } from 'react-native'; // Change this line
import Text from './Text';
import { useFormik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';


const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={[
          styles.input,
          formik.touched.username && formik.errors.username ? styles.inputError : null
        ]}
        autoCapitalize="none"
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: 'red' }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder='Password'
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        secureTextEntry
        style={[
          styles.input,
          formik.touched.password && formik.errors.password ? styles.inputError : null
        ]}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: 'red' }}>{formik.errors.password}</Text>
      )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text fontSize="subheading" fontWeight="bold" color="white">
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const onSubmit = values => {
    console.log('submit', values);
  };

  return (
    <SignInForm onSubmit={onSubmit} />
  );
};


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
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.white,
    fontFamily: theme.fonts.main,
  },
  inputError: {
    borderColor: theme.colors.onError,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
});

export default SignIn;
