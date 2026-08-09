import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const AppBarTab = ({ children, onPress }) => {
  const content = (
    <Text color="appBarText" fontSize="subheading" fontWeight="bold">
      {children}
    </Text>
  );

  if (onPress) {
    return (
      <Pressable style={styles.tab} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return (
    <View style={styles.tab}>
      {content}
    </View>
  );
};

export default AppBarTab;