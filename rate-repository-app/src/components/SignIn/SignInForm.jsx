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
    marginTop: 5,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  inputError: {
    borderColor: '#d73a4a',
  }
});

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = ({onSubmit}) => {

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit
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
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;