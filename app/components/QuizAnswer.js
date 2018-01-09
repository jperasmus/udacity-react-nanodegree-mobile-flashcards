import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Easing } from 'react-native';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizAnswer extends Component {
  state = {
    viewAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.viewAnimation, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear()
    }).start();
  }

  animateOut = cb => {
    Animated.timing(this.state.viewAnimation, {
      toValue: 0,
      duration: 150,
      easing: Easing.linear()
    }).start(cb);
  };

  render() {
    const { answer, onCorrect, onIncorrect } = this.props;
    const { viewAnimation } = this.state;

    return (
      <Animated.View
        style={{
          opacity: viewAnimation,
          transform: [
            {
              translateY: viewAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0]
              })
            }
          ]
        }}
      >
        <CenteredContainer>
          <Header>Answer</Header>
          <Paragraph boxed>{answer}</Paragraph>
          <CenteredContainer>
            <Paragraph>Did you get it right?</Paragraph>
            <Button title="Nope" onPress={() => this.animateOut(onIncorrect)} />
            <Button title="Yes!!" isPrimary onPress={() => this.animateOut(onCorrect)} />
          </CenteredContainer>
        </CenteredContainer>
      </Animated.View>
    );
  }
}

QuizAnswer.defaultProps = {};

QuizAnswer.propTypes = {
  answer: PropTypes.string.isRequired,
  onCorrect: PropTypes.func.isRequired,
  onIncorrect: PropTypes.func.isRequired
};

export default QuizAnswer;
