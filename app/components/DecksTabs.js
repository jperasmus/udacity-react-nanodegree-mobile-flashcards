import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import DeckListView, { DeckListViewTabBarIcon } from './DeckListView';
import AddDeck, { AddDeckTabBarIcon } from './AddDeck';
import { white, orange, gray, black25 } from '../helpers/colors';

const DecksTabs = TabNavigator(
  {
    Decks: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: DeckListViewTabBarIcon
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: AddDeckTabBarIcon
      }
    }
  },
  {
    swipeEnabled: false,
    animationEnabled: true,
    tabBarPosition: Platform.OS === 'ios' ? 'bottom' : 'top',
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? orange : white,
      activeBackgroundColor: Platform.OS === 'ios' ? white : orange,
      inactiveTintColor: gray,
      inactiveBackgroundColor: Platform.OS === 'ios' ? white : orange,
      showLabel: true,
      style: {
        height: 56,
        paddingBottom: 4,
        shadowColor: black25,
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 0.9
      },
      labelStyle: {
        fontSize: 12
      },
      allowFontScaling: true
    }
  }
);

export default DecksTabs;
