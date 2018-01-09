import { RESET_QUIZ, ANSWERED_QUESTION, SHOW_ANSWER } from '../actions';
import { QUESTION, ANSWER, RESULT } from '../utils/constants';

const initialState = {
  view: QUESTION,
  currentQuestionIndex: 0,
  correct: [],
  answered: 0
};

export default function quiz(state = initialState, action) {
  switch (action.type) {
    case RESET_QUIZ:
      return { ...initialState };

    case SHOW_ANSWER:
      return { ...state, ...{ view: ANSWER } };

    case ANSWERED_QUESTION: {
      const { index, total } = action;
      const newQuestionIndex = state.currentQuestionIndex + 1;
      const isDone = newQuestionIndex === total;

      return {
        ...state,
        ...{
          answered: state.answered + 1,
          correct: typeof index === 'number' ? state.correct.concat([index]) : state.correct,
          currentQuestionIndex: newQuestionIndex,
          view: isDone ? RESULT : QUESTION
        }
      };
    }

    default:
      return state;
  }
}
