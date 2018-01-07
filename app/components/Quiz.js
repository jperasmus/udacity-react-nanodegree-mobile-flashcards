import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, Button, ActivityIndicator } from 'react-native';
import get from 'lodash.get';
import { CenteredContainer } from './styled';
import { black75, yellow } from '../helpers/colors';
import { resetQuiz, answeredQuestion } from '../actions';
import QuizQuestion from './QuizQuestion';
import QuizAnswer from './QuizAnswer';
import QuizResult from './QuizResult';

const QUESTION = 'QUESTION';
const ANSWER = 'ANSWER';
const RESULT = 'RESULT';

const defaultState = {
  view: QUESTION,
  index: 0
};

class Quiz extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerRight = <Button title="Restart" color={yellow} onPress={params.restart ? params.restart : () => null} />;

    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }

    return { headerRight };
  };

  state = { ...defaultState };

  componentDidMount() {
    this.props.navigation.setParams({ restart: this.restart });
  }

  componentWillUnmount() {
    this.props.resetQuiz();
  }

  restart = () => {
    // confirm restart quiz?

    this.setState({ ...defaultState });
  };

  next = () => {
    this.setState(({ index }) => {
      const isDone = index + 1 === this.props.questions.length;

      return {
        index: isDone ? index : index + 1,
        view: isDone ? RESULT : QUESTION
      };
    });
  };

  correct = () => {
    this.props.answeredQuestion(this.state.index);
    this.next();
  };

  incorrect = () => {
    this.props.answeredQuestion();
    this.next();
  };

  showAnswer = () => {
    this.setState({ view: ANSWER });
  };

  currentBody = () => {
    const { view, index } = this.state;

    switch (view) {
      case RESULT: {
        const { questions: { length }, correctCount } = this.props;
        return <QuizResult correctCount={correctCount} totalCount={length} onRestart={this.restart} />;
      }

      case ANSWER:
        return (
          <QuizAnswer
            answer={get(this.props, `questions[${index}].answer`, '')}
            onCorrect={this.correct}
            onIncorrect={this.incorrect}
          />
        );

      case QUESTION:
      default:
        return (
          <QuizQuestion question={get(this.props, `questions[${index}].question`, '')} showAnswer={this.showAnswer} />
        );
    }
  };

  render() {
    const { title, questions, answeredCount } = this.props;
    return (
      <CenteredContainer style={{ backgroundColor: black75 }}>
        <Text>{title}</Text>
        <Text>
          {answeredCount} of {questions.length}
        </Text>
        <CenteredContainer>{this.currentBody()}</CenteredContainer>
      </CenteredContainer>
    );
  }
}

Quiz.defaultProps = {};

Quiz.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired,
  correctCount: PropTypes.number.isRequired,
  answeredCount: PropTypes.number.isRequired,
  resetQuiz: PropTypes.func.isRequired,
  answeredQuestion: PropTypes.func.isRequired
};

const mapStateToProps = ({ decks, quiz }, { navigation }) => {
  const title = get(navigation, 'state.params.title', '');
  return { ...decks[title], ...quiz };
};

const mapDispatchToProps = dispatch => ({
  resetQuiz: () => dispatch(resetQuiz()),
  answeredQuestion: () => dispatch(answeredQuestion())
});

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
