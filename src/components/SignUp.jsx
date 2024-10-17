import { TextInput } from 'react-native';
import Text from './Text';
import { useFormik } from 'formik';
import { Pressable, View, StyleSheet } from 'react-native';
import theme from '../theme';
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import useSignUp from '../hooks/useSignUp';

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
  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

const SignUpForm = ( { onSubmit }) => {
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
            <TextInput
                placeholder='Password confirmation'
                value={formik.values.passwordConfirmation}
                onChangeText={formik.handleChange('passwordConfirmation')}
                secureTextEntry
                style={[
                    styles.input,
                    formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? styles.inputError : null
                ]}
            />
            {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                <Text style={{ color: 'red' }}>{formik.errors.passwordConfirmation}</Text>
            )}
            <Pressable onPress={formik.handleSubmit} style={styles.button}>
                <Text fontSize="subheading" fontWeight="bold" color="white">
                    Sign up
                </Text>
            </Pressable>

        </View>
    );
}

const SignUp = () => {
    const navigate = useNavigate();
    const [createUser] = useSignUp();

    const onSubmit = async (values) => {
        const { username, password } = values;
        try {
            await createUser({ username, password });
            navigate('/signin');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <SignUpForm onSubmit={onSubmit} />
    );
}

export default SignUp;


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