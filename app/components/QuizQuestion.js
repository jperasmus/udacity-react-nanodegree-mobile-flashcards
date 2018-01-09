import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Animated, Easing } from 'react-native';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizQuestion extends Component {
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

  render() {
    const { viewAnimation } = this.state;
    const { question, showAnswer } = this.props;

    return (
      <Animated.View
        style={{
          opacity: viewAnimation,
          transform: [
            {
              translateY: viewAnimation.interpolate({
                inputRange: [0, 1],
                outputRange: [-50, 0]
              })
            }
          ]
        }}
      >
        <CenteredContainer>
          <Header>Question</Header>
          <Paragraph boxed>{question}</Paragraph>
          <CenteredContainer>
            <Button
              title="Show Answer"
              isPrimary
              onPress={() => {
                Animated.timing(viewAnimation, {
                  toValue: 0,
                  duration: 150,
                  easing: Easing.linear()
                }).start(showAnswer);
              }}
            />
          </CenteredContainer>
        </CenteredContainer>
      </Animated.View>
    );
  }
}

QuizQuestion.defaultProps = {};

QuizQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  showAnswer: PropTypes.func.isRequired
};

export default connect()(QuizQuestion);
