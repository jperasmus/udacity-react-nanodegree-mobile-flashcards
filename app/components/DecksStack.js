import { StackNavigator } from 'react-navigation';
import { Platform } from 'react-native';
import get from 'lodash.get';
import DecksTabs from './DecksTabs';
import SingleDeck from './SingleDeck';
import AddCard from './AddCard';
import Quiz from './Quiz';
import { black, white, yellow } from '../helpers/colors';

const DecksStack = StackNavigator(
  {
    Decks: {
      screen: DecksTabs
    },
    Single: {
      screen: SingleDeck,
      navigationOptions: () => ({
        title: 'Deck'
      })
    },
    AddCard: {
      screen: AddCard,
      navigationOptions: () => ({
        title: 'Add Card'
      })
    },
    Quiz: {
      screen: Quiz,
      navigationOptions: ({ navigation }) => ({
        title: `${get(navigation, 'state.params.title', '')} Quiz`
      })
    }
  },
  {
    mode: 'card',
    headerMode: Platform.OS === 'ios' ? 'float' : 'screen',
    navigationOptions: () => ({
      headerStyle: {
        height: 30,
        backgroundColor: black
      },
      headerTitleStyle: {
        margin: 0,
        padding: 0,
        color: white
      },
      headerBackTitleStyle: {
        color: yellow
      },
      headerTintColor: yellow
    })
  }
);

export default DecksStack;
