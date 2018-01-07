import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizResult extends Component {
  render() {
    const { totalCount, correctCount, onRestart } = this.props;

    return (
      <CenteredContainer>
        <Header>Results</Header>
        <Paragraph>
          You had {correctCount} correct out of {totalCount}
        </Paragraph>
        <CenteredContainer>
          <Button title="Restart" isPrimary onPress={onRestart} />
        </CenteredContainer>
      </CenteredContainer>
    );
  }
}

QuizResult.defaultProps = {};

QuizResult.propTypes = {
  totalCount: PropTypes.number.isRequired,
  correctCount: PropTypes.number.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default QuizResult;
