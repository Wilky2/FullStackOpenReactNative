import Main from './src/components/Main';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';
import createApolloClient from './src/utils/apolloClient';
const apolloClient = createApolloClient();

const App = () => {
  console.log("env check:", process.env.EXPO_PUBLIC_ENV);
  return <>
    <StatusBar style="light" />
    <NativeRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  </>;
};

export default App;