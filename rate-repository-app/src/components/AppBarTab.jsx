import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  tab: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

const AppBarTab = ({ children, onPress }) => {
  return (
    <Pressable style={styles.tab} onPress={onPress}>
      <Text color="appBarText" fontSize="subheading" fontWeight="bold">
        {children}
      </Text>
    </Pressable>
  );
};

export default AppBarTab;