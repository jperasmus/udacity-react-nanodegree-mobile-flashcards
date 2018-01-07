import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizQuestion extends Component {
  render() {
    const { question, showAnswer } = this.props;

    return (
      <CenteredContainer>
        <Header>Question</Header>
        <Paragraph>{question}</Paragraph>
        <CenteredContainer>
          <Button title="Show Answer" isPrimary onPress={showAnswer} />
        </CenteredContainer>
      </CenteredContainer>
    );
  }
}

QuizQuestion.defaultProps = {};

QuizQuestion.propTypes = {
  question: PropTypes.string.isRequired,
  showAnswer: PropTypes.func.isRequired
};

export default connect()(QuizQuestion);
