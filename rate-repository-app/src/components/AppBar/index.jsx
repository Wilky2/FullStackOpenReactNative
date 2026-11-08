import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../../theme';
import AppBarTab from '../AppBarTab';
import { Link } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client/react';
import { ME } from '../../graphql/queries';
import useAuthStorage from '../../hooks/useAuthStorage';

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
  const { data, loading } = useQuery(ME);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const onPress = () => {
    authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  if(loading){
    return null;
  }
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.container}>
        <Link to="/"><AppBarTab >Repositories</AppBarTab></Link>
        {data.me ? <Link to="/create-review"><AppBarTab>CreateReview</AppBarTab></Link> : <Link to="/signup"><AppBarTab>Sign up</AppBarTab></Link>}     
        {data.me ? <AppBarTab onPress={onPress}>SignOut</AppBarTab> : <Link to="/signin"><AppBarTab>Sign in</AppBarTab></Link>}
      </ScrollView>
    </View>
  );
};

export default AppBar;