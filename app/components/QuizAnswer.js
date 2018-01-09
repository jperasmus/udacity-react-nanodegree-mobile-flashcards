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
        <Paragraph boxed>{answer}</Paragraph>
        <CenteredContainer>
          <Paragraph>Did you get it right?</Paragraph>
          <Button title="Nope" onPress={onIncorrect} />
          <Button title="Yes!!" isPrimary onPress={onCorrect} />
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
