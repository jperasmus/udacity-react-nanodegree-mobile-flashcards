// Spoofed API layer persisting to AsyncStorage instead of a database
import { AsyncStorage } from 'react-native';
import compose from 'compose-then';
import whereNotEmpty from '../helpers/where-not-empty';

const DECKS_STORAGE_KEY = 'FLASHCARDS';

export const saveDeckTitle = async deck => {
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [deck.title]: deck }));
  return deck;
};

export const getDecks = async () => {
  const getAndPrepDecks = compose(whereNotEmpty, JSON.parse, AsyncStorage.getItem);
  return getAndPrepDecks(DECKS_STORAGE_KEY);
};

export const getDeck = async id => {
  const decks = await getDecks();
  return decks[id];
};

export const addCardToDeck = async ({ title, card }) => {
  const deck = await getDeck(title);
  const updatedDeck = { ...deck, ...{ questions: deck.questions.concat(card) } };
  await AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({ [title]: updatedDeck }));
  return deck;
};
