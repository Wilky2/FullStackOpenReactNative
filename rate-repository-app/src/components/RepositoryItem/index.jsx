import { View, StyleSheet, Image } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
  },
  topContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  fullNameText: {
    marginBottom: 5,
  },
  descriptionText: {
    marginBottom: 8,
  },
  languageContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    marginBottom: 4,
  },
});

const formatCount = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
};

const RepositoryHeader = ({ ownerAvatarUrl, fullName, description, language }) => {
  return (
    <View style={styles.topContainer}>
      <Image source={{ uri: ownerAvatarUrl }} style={styles.avatar} />
      <View style={styles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading" style={styles.fullNameText}>
          {fullName}
        </Text>
        <Text color="textSecondary" style={styles.descriptionText}>
          {description}
        </Text>
        <View style={styles.languageContainer}>
          <Text color="appBarText">
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

const StatItem = ({ label, value }) => {
  return (
    <View style={styles.statItem}>
      <Text fontWeight="bold" style={styles.statValue}>
        {value}
      </Text>
      <Text color="textSecondary">
        {label}
      </Text>
    </View>
  );
};

const RepositoryStats = ({ stargazersCount, forksCount, reviewCount, ratingAverage }) => {
  return (
    <View style={styles.bottomContainer}>
      <StatItem label="Stars" value={formatCount(stargazersCount)} />
      <StatItem label="Forks" value={formatCount(forksCount)} />
      <StatItem label="Reviews" value={formatCount(reviewCount)} />
      <StatItem label="Rating" value={ratingAverage} />
    </View>
  );
};

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <RepositoryHeader
        ownerAvatarUrl={repository.ownerAvatarUrl}
        fullName={repository.fullName}
        description={repository.description}
        language={repository.language}
      />
      <RepositoryStats
        stargazersCount={repository.stargazersCount}
        forksCount={repository.forksCount}
        reviewCount={repository.reviewCount}
        ratingAverage={repository.ratingAverage}
      />
    </View>
  );
};

export default RepositoryItem;
