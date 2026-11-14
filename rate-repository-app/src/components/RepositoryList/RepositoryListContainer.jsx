import { useState } from 'react';
import { FlatList, View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { Searchbar, Button, Menu, Divider, PaperProvider } from 'react-native-paper';
import RepositoryItem from '../RepositoryItem';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  headerContainer: {
    paddingVertical: 10,
  },
  searchbar: {
    backgroundColor: '#ffffff',
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  searchbarInput: {
    fontSize: 16,
  },
  menuContainer: {
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
  buttonContent: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    height: 50,
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
  arrowIcon: {
    color: '#000000',
    fontSize: 14,
  },
  menuContent: {
    backgroundColor: '#ffffff',
  },
  menuItemTitle: {
    color: '#000000',
    fontSize: 15,
  },
  disabledMenuItemTitle: {
    color: '#888888',
    fontSize: 15,
  },
  divider: {
    backgroundColor: '#000000',
    height: 1,
  },
});

const paperTheme = {
  colors: {
    elevation: {
      level2: '#ffffff',
    },
    surface: '#ffffff',
  },
};

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({
  searchKeyword,
  setSearchKeyword,
  selectedOption,
  setSelectedOption,
  visible,
  openMenu,
  closeMenu,
  width,
  menuWidth,
}) => {
  const handleSelect = (option) => {
    setSelectedOption(option);
    closeMenu();
  };

  return (
    <View style={styles.headerContainer}>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchKeyword}
        value={searchKeyword}
        style={styles.searchbar}
        inputStyle={styles.searchbarInput}
      />
      <View style={styles.menuContainer}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{
            left: (width - menuWidth) / 2,
            width: menuWidth,
          }}
          contentStyle={[styles.menuContent, { width: menuWidth }]}
          anchor={
            <Button
              mode="text"
              labelStyle={styles.buttonLabel}
              contentStyle={styles.buttonContent}
              style={styles.button}
              onPress={openMenu}
              icon={() => (
                <Text style={styles.arrowIcon}>
                  {visible ? '▲' : '▼'}
                </Text>
              )}
            >
              {selectedOption}
            </Button>
          }
        >
          <Menu.Item
            title="Select an item..."
            disabled
            titleStyle={styles.disabledMenuItemTitle}
          />
          <Divider style={styles.divider} />
          <Menu.Item
            onPress={() => handleSelect('Latest repositories')}
            title="Latest repositories"
            titleStyle={styles.menuItemTitle}
          />
          <Menu.Item
            onPress={() => handleSelect('Highest rated repositories')}
            title="Highest rated repositories"
            titleStyle={styles.menuItemTitle}
          />
          <Menu.Item
            onPress={() => handleSelect('Lowest rated repositories')}
            title="Lowest rated repositories"
            titleStyle={styles.menuItemTitle}
          />
        </Menu>
      </View>
    </View>
  );
};

const RepositoryListContainer = ({
  repositories,
  selectedOption = 'Latest repositories',
  setSelectedOption = () => {},
  searchKeyword = '',
  setSearchKeyword = () => {},
}) => {
  const [visible, setVisible] = useState(false);
  const { width } = useWindowDimensions();

  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const menuWidth = Math.min(width * 0.85, 300);

  return (
    <PaperProvider theme={paperTheme}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repository={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <RepositoryListHeader
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            visible={visible}
            openMenu={() => setVisible(true)}
            closeMenu={() => setVisible(false)}
            width={width}
            menuWidth={menuWidth}
          />
        }
      />
    </PaperProvider>
  );
};

export default RepositoryListContainer;
