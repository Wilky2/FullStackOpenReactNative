import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import AppBarTab from './AppBarTab';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
    paddingBottom: 10,
    paddingLeft: 10,    
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Link to="/"><AppBarTab >Repositories</AppBarTab></Link>
      <Link to="/signin"><AppBarTab>SignIn</AppBarTab></Link>
    </View>
  );
};

export default AppBar;