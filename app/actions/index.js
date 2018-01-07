import * as api from '../utils/api';

export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';

export function fetchDecksSuccess(decks) {
  return {
    type: FETCH_DECKS,
    decks
  };
}

export function fetchDecks() {
  return dispatch => api.getDecks().then(decks => dispatch(fetchDecksSuccess(decks)));
}

export const addDeckSuccess = deck => ({
  type: ADD_DECK,
  deck
});

export function addDeck({ title, description }) {
  const payload = { title, description, questions: [] };

  return dispatch => api.saveDeckTitle(payload).then(deck => dispatch(addDeckSuccess(deck)));
}
