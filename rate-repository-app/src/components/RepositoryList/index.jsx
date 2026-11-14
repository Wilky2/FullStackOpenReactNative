import useRepositories from '../../hooks/useRepositories';
import RepositoryListContainer from './RepositoryListContainer';
import { useState } from 'react';
import { View, StyleSheet, useWindowDimensions, Text } from 'react-native';
import { Button, Menu, Divider, PaperProvider } from 'react-native-paper';

const repositories = [
    {
        id: 'jaredpalmer.formik',
        fullName: 'jaredpalmer/formik',
        description: 'Build forms in React, without the tears',
        language: 'TypeScript',
        forksCount: 1589,
        stargazersCount: 21553,
        ratingAverage: 88,
        reviewCount: 4,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
    },
    {
        id: 'rails.rails',
        fullName: 'rails/rails',
        description: 'Ruby on Rails',
        language: 'Ruby',
        forksCount: 18349,
        stargazersCount: 45377,
        ratingAverage: 100,
        reviewCount: 2,
        ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
    },
    {
        id: 'django.django',
        fullName: 'django/django',
        description: 'The Web framework for perfectionists with deadlines.',
        language: 'Python',
        forksCount: 21015,
        stargazersCount: 48496,
        ratingAverage: 73,
        reviewCount: 5,
        ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
    },
    {
        id: 'reduxjs.redux',
        fullName: 'reduxjs/redux',
        description: 'Predictable state container for JavaScript apps',
        language: 'TypeScript',
        forksCount: 13902,
        stargazersCount: 52869,
        ratingAverage: 0,
        reviewCount: 0,
        ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
    },
];

const styles = StyleSheet.create({
  menuContainer: {
    paddingVertical: 8,
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

const getOrderVariables = (option) => {
  switch (option) {
    case 'Highest rated repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
    case 'Lowest rated repositories':
      return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
    case 'Latest repositories':
      return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
    default:
      return undefined;
  }
};

const RepositoryList = () => {
    const { width } = useWindowDimensions();

    const [visible, setVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select an item...');

    const { repositories } = useRepositories(getOrderVariables(selectedOption));

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleSelect = (option) => {
        setSelectedOption(option);
        closeMenu();
    };

    const menuWidth = Math.min(width * 0.85, 300);

    return (
      <PaperProvider theme={paperTheme}>
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
        <RepositoryListContainer repositories={repositories} />
      </PaperProvider>
    );
};

export default RepositoryList;
