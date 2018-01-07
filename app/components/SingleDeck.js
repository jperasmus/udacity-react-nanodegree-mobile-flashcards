import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { CenteredContainer, DeckTitle, DeckInfo, Button, ButtonText } from './styled';

class SingleDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const title = get(navigation, 'state.params.title', '');

    return {
      title
    };
  };

  render() {
    const { title, questions: { length } } = this.props;

    return (
      <CenteredContainer>
        <DeckTitle>{title}</DeckTitle>
        <DeckInfo>
          {length} {length === 1 ? 'card' : 'cards'}
        </DeckInfo>
        <Button>
          <ButtonText>Add Card</ButtonText>
        </Button>
        <Button isPrimary>
          <ButtonText isPrimary>Start Quiz</ButtonText>
        </Button>
      </CenteredContainer>
    );
  }
}

SingleDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = ({ decks }, { navigation }) => {
  const title = get(navigation, 'state.params.title', '');
  return { ...decks[title] };
};

export default connect(mapStateToProps)(SingleDeck);
