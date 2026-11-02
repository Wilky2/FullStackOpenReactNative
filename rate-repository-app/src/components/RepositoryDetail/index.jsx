import { useParams } from "react-router-native";
import RepositoryItem from "../RepositoryItem";
import useRepository from "../../hooks/useRepository";
import useReviews from "../../hooks/useReviews";
import { View, FlatList, StyleSheet } from "react-native-web";
import Text from '../Text';
import ReviewItem from "./ReviewItem";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryDetail = () => {
    
    let { repositoryId } = useParams();

    const { repository, loading } = useRepository(repositoryId);    

    const { reviews, reviewLoading } = useReviews(repositoryId);

    const reviewsNodes = reviews ? 
        reviews.edges.map(edge => edge.node) : [];

    if(loading || reviewLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View>
            <RepositoryItem repository={repository} isNotRepositoryDetail={false}/>
            <FlatList
                data={reviewsNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

export default RepositoryDetail;