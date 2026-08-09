import { useFormik } from 'formik';
import { View, TextInput, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

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
});

const initialValues = {
  username: '',
  password: '',
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };
  
  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#a0a0a0"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
      />
      <TextInput
        style={styles.input}
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#a0a0a0"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
      />
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;