import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'react-native';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';
import { clearLocalNotifications, setLocalNotification } from '../utils/notifications';

const GRADE_MAP = {
  FF: 'Failed so hard 👎👎',
  F: 'Failed hard 👎',
  E: 'Less games, more study 🙈',
  D: "Maybe you studied, maybe you didn't 🤷‍♀️",
  C: 'Nice one, keep learning 👍',
  B: 'Well done! You know enough to be dangerous! 🔥',
  A: 'You are too smart 🏆',
  'A+': 'Slow down, Einstein! 👻'
};

class QuizResult extends Component {
  state = {
    viewAnimation: new Animated.Value(0),
    symbolAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    const { viewAnimation, symbolAnimation } = this.state;

    Animated.sequence([
      Animated.timing(viewAnimation, {
        toValue: 1,
        duration: 300
      }),
      Animated.spring(symbolAnimation, {
        toValue: 1,
        duration: 200
      })
    ]).start();

    // When a user reaches the result view, we can reset the local notification
    // Chose not to ask for notifications when the app loads the first time because
    // I personally find that annoying. Rather do it here at a strategic place where
    // the user *hopefully* found some use/joy out of the app
    clearLocalNotifications().then(setLocalNotification);
  }

  getGradeSymbol = grade => {
    if (grade === 100) {
      return 'A+';
    }
    if (grade >= 80) {
      return 'A';
    }
    if (grade >= 70) {
      return 'B';
    }
    if (grade >= 60) {
      return 'C';
    }
    if (grade >= 50) {
      return 'D';
    }
    if (grade >= 40) {
      return 'E';
    }
    if (grade >= 30) {
      return 'F';
    }
    return 'FF';
  };

  render() {
    const { viewAnimation, symbolAnimation } = this.state;
    const { total, correct, onRestart } = this.props;
    const grade = correct.length / total * 100;
    const gradeSymbol = this.getGradeSymbol(grade);

    return (
      <Animated.View style={{ opacity: viewAnimation }}>
        <CenteredContainer>
          <Header>Results</Header>
          <Paragraph>
            You had {correct.length} correct out of {total}
          </Paragraph>
          <Animated.View style={{ transform: [{ scale: symbolAnimation }] }}>
            <Paragraph huge>{gradeSymbol}</Paragraph>
          </Animated.View>
          <Paragraph boxed>{GRADE_MAP[gradeSymbol]}</Paragraph>
          <CenteredContainer>
            <Button title="Restart" isPrimary onPress={onRestart} />
          </CenteredContainer>
        </CenteredContainer>
      </Animated.View>
    );
  }
}

QuizResult.defaultProps = {};

QuizResult.propTypes = {
  total: PropTypes.number.isRequired,
  correct: PropTypes.array.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default QuizResult;
