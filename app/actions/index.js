import * as api from '../utils/api';

export const FETCH_DECKS = 'FETCH_DECKS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';

export const fetchDecksSuccess = decks => ({
  type: FETCH_DECKS,
  decks
});

export const fetchDecks = () => async dispatch => {
  const decks = await api.getDecks();
  return dispatch(fetchDecksSuccess(decks));
};

export const addDeckSuccess = deck => ({
  type: ADD_DECK,
  deck
});

export const addDeck = ({ title, description }) => {
  const payload = { title, description, questions: [] };

  return async dispatch => {
    const deck = await api.saveDeckTitle(payload);
    return dispatch(addDeckSuccess(deck));
  };
};

export const addCardSuccess = ({ title, card }) => ({
  type: ADD_CARD,
  title,
  card
});

export const addCard = payload => async dispatch => {
  await api.addCardToDeck(payload);
  return dispatch(addCardSuccess(payload));
};
