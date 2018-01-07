import React from 'react';
import { TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import DeckListView from './DeckListView';
import AddDeck from './AddDeck';

const DecksTabs = TabNavigator(
  {
    Decks: {
      screen: DeckListView,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor, focused }) => (
          <MaterialCommunityIcons name={focused ? 'cards' : 'cards-outline'} size={26} style={{ color: tintColor }} />
        )
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'}
            size={26}
            style={{ color: tintColor }}
          />
        )
      }
    }
  },
  {
    navigationOptions: {
      // header: null
    }
    //   tabBarOptions: {
    //     activeTintColor: Platform.OS === 'ios' ? purple : white,
    //     style: {
    //       height: 56,
    //       backgroundColor: Platform.OS === 'ios' ? white : purple,
    //       shadowColor: 'rgba(0,0,0,0.24)',
    //       shadowOffset: {
    //         width: 0,
    //         height: 3
    //       },
    //       shadowRadius: 6,
    //       shadowOpacity: 1
    //     }
    //   }
  }
);

export default DecksTabs;
