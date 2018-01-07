import { StackNavigator } from 'react-navigation';
import DecksTabs from './DecksTabs';
import SingleDeck from './SingleDeck';

const DecksStack = StackNavigator({
  Decks: {
    screen: DecksTabs
  },
  Single: {
    screen: SingleDeck
  }
});

export default DecksStack;
