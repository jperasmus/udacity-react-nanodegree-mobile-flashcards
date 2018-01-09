// Spoofed API layer persisting to AsyncStorage instead of a database
import { AsyncStorage } from 'react-native';
import compose from 'compose-then';
import whereNotEmpty from '../helpers/where-not-empty';
import { DECKS_STORAGE_KEY, DECK_ALREADY_EXIST } from './constants';

export const getDecks = async () => {
  const getAndPrepDecks = compose(whereNotEmpty, JSON.parse, AsyncStorage.getItem);
  return getAndPrepDecks(DECKS_STORAGE_KEY);
};

export const getDeck = async id => {
  const decks = await getDecks();
  return decks[id];
};

export const saveDeckTitle = async deck => {
  const deckExist = await getDeck(deck.title);

  if (deckExist) {
    throw new Error(DECK_ALREADY_EXIST);
  }

  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [deck.title]: deck }));
  return deck;
};

export const addCardToDeck = async ({ title, card }) => {
  const deck = await getDeck(title);
  const updatedDeck = { ...deck, ...{ questions: deck.questions.concat(card) } };
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [title]: updatedDeck }));
  return deck;
};
