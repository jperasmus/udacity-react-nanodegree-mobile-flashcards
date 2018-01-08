import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CenteredContainer, Header, Paragraph } from './styled';
import Button from './Button';

class QuizResult extends Component {
  render() {
    const { total, correct, onRestart } = this.props;

    return (
      <CenteredContainer>
        <Header>Results</Header>
        <Paragraph>
          You had {correct.length} correct out of {total}
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
  total: PropTypes.number.isRequired,
  correct: PropTypes.array.isRequired,
  onRestart: PropTypes.func.isRequired
};

export default QuizResult;
