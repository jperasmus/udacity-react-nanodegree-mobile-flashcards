import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizAnswer extends Component {
  render() {
    const { answer, onCorrect, onIncorrect } = this.props;

    return (
      <CenteredContainer>
        <Header>Answer</Header>
        <Paragraph>{answer}</Paragraph>
        <CenteredContainer>
          <Button title="Whoops! I failed." onPress={onIncorrect} />
          <Button title="Yay! I had it right!" isPrimary onPress={onCorrect} />
        </CenteredContainer>
      </CenteredContainer>
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
