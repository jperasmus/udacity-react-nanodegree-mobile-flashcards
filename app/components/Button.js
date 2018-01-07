import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyledButton, ButtonText } from './styled';

class Button extends Component {
  render() {
    const { title, isPrimary, isDisabled, onPress } = this.props;

    return (
      <StyledButton isPrimary={isPrimary} isDisabled={isDisabled} onPress={onPress}>
        <ButtonText isPrimary={isPrimary} isDisabled={isDisabled}>
          {title}
        </ButtonText>
      </StyledButton>
    );
  }
}

Button.defaultProps = {
  isPrimary: false,
  isDisabled: false,
  onPress: () => {}
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isPrimary: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func
};

export default Button;
