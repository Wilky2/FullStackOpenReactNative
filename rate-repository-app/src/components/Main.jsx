import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import theme from '../theme';
import { Route, Routes, Navigate } from 'react-router-native';
import SignIn from './SignIn';
import RepositoryDetail from './RepositoryDetail';
import CreateReview from './CreateReview';
import SignUp from './SignUp';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.mainBackground,
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <AppBar />
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/create-review" element={<CreateReview />} />
                <Route path="/:repositoryId" element={<RepositoryDetail />} />
                <Route path="/" element={<RepositoryList />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;