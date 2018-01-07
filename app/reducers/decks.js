import { ADD_DECK, FETCH_DECKS } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case ADD_DECK:
      return { ...state, ...{ [action.deck.title]: action.deck } };

    case FETCH_DECKS:
      return { ...action.decks };

    default:
      return state;
  }
}
