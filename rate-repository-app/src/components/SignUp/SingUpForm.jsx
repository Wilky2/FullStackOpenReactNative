import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';
import * as yup from 'yup';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    alignItems: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ced4da', // Bootstrap gray border
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 15,
    fontSize: theme.fontSizes.subheading,
    fontFamily: theme.fonts.main,
    marginBottom: 15,
    backgroundColor: '#ffffff',
  },
  button: {
    width: '90%',
    height: 50,
    backgroundColor: theme.colors.primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
  },
  errorText: {
    color: 'red',
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    marginBottom: 15,
    marginTop: -5,
    paddingHorizontal: 25,
    alignSelf: 'flex-start',
  },
  inputError: {
    borderColor: '#d73a4a',
  },
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters')
    .required('Username is required'),
  password: yup
    .string()
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters')
    .required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Password confirmation must match the password')
    .required('Password confirmation is required'),
});

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const SignUpForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.username && formik.errors.username && styles.inputError,
        ]}
        placeholder="Username"
        placeholderTextColor="#a0a0a0"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={styles.errorText}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.inputError,
        ]}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#a0a0a0"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && styles.inputError,
        ]}
        secureTextEntry
        placeholder="Password confirmation"
        placeholderTextColor="#a0a0a0"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange('passwordConfirmation')}
        onBlur={formik.handleBlur('passwordConfirmation')}
      />
      {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
        <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

export default SignUpForm;
