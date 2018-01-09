import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ActivityIndicator, Alert } from 'react-native';
import get from 'lodash.get';
import QuizQuestion from './QuizQuestion';
import QuizAnswer from './QuizAnswer';
import QuizResult from './QuizResult';
import { CenteredContainer, FootNote } from './styled';
import { black75, yellow } from '../helpers/colors';
import { resetQuiz, answeredQuestion, showAnswer } from '../actions';
import { RESULT, ANSWER, QUESTION } from '../utils/constants';

const noop = () => null;

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = get(navigation, 'state.params', {});
    let headerRight = <Button title="Restart" color={yellow} onPress={params.restart ? params.restart : noop} />;

    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }

    return { headerRight };
  };

  componentDidMount() {
    this.props.navigation.setParams({ restart: this.restart });
  }

  componentWillUnmount() {
    this.props.resetQuiz();
  }

  restart = () => {
    // If the user is on the result view, we don't need to confirm
    if (this.props.view === RESULT) {
      return this.props.resetQuiz();
    }

    return Alert.alert(
      'Restart Quiz',
      'Are you sure you want to start from scratch?',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'OK', onPress: () => this.props.resetQuiz() }],
      { cancelable: false }
    );
  };

  renderCurrentBody = () => {
    const { currentQuestionIndex, view, questions: { length } } = this.props;

    switch (view) {
      case RESULT: {
        const { correct } = this.props;
        return <QuizResult correct={correct} total={length} onRestart={this.restart} />;
      }

      case ANSWER:
        return (
          <QuizAnswer
            answer={get(this.props, `questions[${currentQuestionIndex}].answer`, '')}
            onCorrect={() => this.props.answeredQuestion({ index: currentQuestionIndex, total: length })}
            onIncorrect={() => this.props.answeredQuestion({ total: length })}
          />
        );

      case QUESTION:
      default:
        return (
          <QuizQuestion
            question={get(this.props, `questions[${currentQuestionIndex}].question`, '')}
            showAnswer={this.props.showAnswer}
          />
        );
    }
  };

  render() {
    const { questions, answered } = this.props;
    const totalQuestions = questions.length;
    const questionNumber = answered === totalQuestions ? answered : answered + 1;

    return (
      <CenteredContainer style={{ backgroundColor: black75 }}>
        <CenteredContainer>{this.renderCurrentBody()}</CenteredContainer>
        <FootNote>
          {questionNumber} of {totalQuestions}
        </FootNote>
      </CenteredContainer>
    );
  }
}

Quiz.defaultProps = {};

Quiz.propTypes = {
  navigation: PropTypes.object.isRequired,
  view: PropTypes.string.isRequired,
  currentQuestionIndex: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  correct: PropTypes.array.isRequired,
  answered: PropTypes.number.isRequired,
  resetQuiz: PropTypes.func.isRequired,
  showAnswer: PropTypes.func.isRequired,
  answeredQuestion: PropTypes.func.isRequired
};

const mapStateToProps = ({ decks, quiz }, { navigation }) => {
  const deck = get(navigation, 'state.params.title', '');
  return { ...decks[deck], ...quiz };
};

const mapDispatchToProps = dispatch => ({
  resetQuiz: () => dispatch(resetQuiz()),
  showAnswer: () => dispatch(showAnswer()),
  answeredQuestion: payload => dispatch(answeredQuestion(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
