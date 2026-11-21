import { View, FlatList, StyleSheet } from 'react-native';
import useReviews from '../../hooks/useReviews';
import ReviewItem from '../RepositoryDetail/ReviewItem';
import Text from '../Text';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewList = () => {
  const { reviews, loading, reviewLoading, refetch } = useReviews();

  const reviewsNodes = reviews ? reviews.edges.map((edge) => edge.node) : [];

  const isLoading = loading ?? reviewLoading;

  if (isLoading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviewsNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem review={item} showActions={true} refetch={refetch} />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default ReviewList;
