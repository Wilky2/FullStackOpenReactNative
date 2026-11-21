import { View, StyleSheet, Pressable, Alert, Platform } from 'react-native';
import { useNavigate } from 'react-router-native';
import Text from '../Text';
import theme from '../../theme';
import useDeleteReview from '../../hooks/useDeleteReview';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  reviewContainer: {
    flexDirection: 'row',
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    flexShrink: 0,
  },
  ratingText: {
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  username: {
    marginBottom: 4,
  },
  createdAt: {
    marginBottom: 8,
  },
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  viewButton: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#d73a4a',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    textAlign: 'center',
  },
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);

  const day = date.getDate();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

const ReviewItem = ({ review, showActions = false, refetch, onDelete }) => {
  const navigate = useNavigate();
  const [deleteReviewMutation] = useDeleteReview();

  if (!review) return null;

  const headerTitle = review.repository ? review.repository.fullName : (review.user?.username || '');
  const dateString = review.createdAt || review.createAt;
  const formattedDate = formatDate(dateString);

  const handleViewRepository = () => {
    const repositoryId = review.repositoryId || review.repository?.id;
    if (repositoryId) {
      navigate(`/${repositoryId}`);
    }
  };

  const handleDelete = () => {
    const executeDelete = async () => {
      try {
        if (onDelete) {
          await onDelete(review.id);
        } else {
          await deleteReviewMutation(review.id);
        }
        if (refetch) {
          await refetch();
        }
      } catch (e) {
        console.error(e);
      }
    };

    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: executeDelete,
        },
      ],
      { cancelable: false }
    );

    if (Platform.OS === 'web' && typeof window !== 'undefined' && window.confirm) {
      if (window.confirm('Are you sure you want to delete this review?')) {
        executeDelete();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text fontWeight="bold" fontSize="subheading" style={styles.username}>
            {headerTitle}
          </Text>
          <Text color="textSecondary" style={styles.createdAt}>
            {formattedDate}
          </Text>
          <Text style={styles.text}>{review.text}</Text>
        </View>
      </View>
      {showActions && (
        <View style={styles.buttonsContainer}>
          <Pressable style={styles.viewButton} onPress={handleViewRepository}>
            <Text style={styles.buttonText}>View repository</Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.buttonText}>Delete review</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default ReviewItem;
