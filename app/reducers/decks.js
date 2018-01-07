import { ADD_DECK, FETCH_DECKS, ADD_CARD } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, ...{ [action.deck.title]: action.deck } };

    case ADD_CARD: {
      const { title, card } = action;
      const deck = state[title];
      const updatedDeck = { ...deck, ...{ questions: deck.questions.concat(card) } };
      return { ...state, ...{ [title]: updatedDeck } };
    }

    case FETCH_DECKS:
      return { ...action.decks };

    default:
      return state;
  }
}
