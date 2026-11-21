import { View, FlatList, StyleSheet } from "react-native-web";
import useReviews from "../../hooks/useReviews";
import ReviewItem from "../RepositoryDetail/ReviewItem";
import Text from "../Text";

const styles = StyleSheet.create({
    separator: {
        height: 10,
    },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
    const { reviews, reviewLoading } = useReviews();

    const reviewsNodes = reviews ? 
        reviews.edges.map(edge => edge.node) : [];
    
    if(reviewLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }
    return (
        <View>
            <FlatList
                data={reviewsNodes}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={item => item.id}
            />
        </View>
    )
};

export default ReviewList;