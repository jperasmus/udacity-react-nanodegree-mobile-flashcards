import { RESET_QUIZ, ANSWERED_QUESTION } from '../actions';

const initialState = {
  title: '',
  correctCount: 0,
  answeredCount: 0
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case RESET_QUIZ:
      return { ...initialState };

    case ANSWERED_QUESTION:
      return {
        ...state,
        ...{
          answeredCount: state.answeredCount + 1,
          correctCount: action.index ? state.correctCount + 1 : state.correctCount
        }
      };

    default:
      return state;
  }
}
