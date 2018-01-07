import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash.get';
import { CenteredContainer, DeckTitle, DeckInfo, DeckDescription } from './styled';
import Button from './Button';
import { black75 } from '../helpers/colors';

class SingleDeck extends Component {
  render() {
    const { title, description, questions: { length }, navigation } = this.props;

    return (
      <CenteredContainer style={{ backgroundColor: black75 }}>
        <DeckTitle>{title}</DeckTitle>
        {description && <DeckDescription>{description}</DeckDescription>}
        <DeckInfo>
          {length} {length === 1 ? 'card' : 'cards'}
        </DeckInfo>
        <CenteredContainer>
          <Button title="Add Card" onPress={() => navigation.navigate('AddCard', { title })} />
          <Button title="Start Quiz" isPrimary onPress={() => navigation.navigate('Quiz', { title })} />
        </CenteredContainer>
      </CenteredContainer>
    );
  }
}

SingleDeck.defaultProps = {
  description: null
};

SingleDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  questions: PropTypes.array.isRequired
};

const mapStateToProps = ({ decks }, { navigation }) => {
  const title = get(navigation, 'state.params.title', '');
  return { ...decks[title] };
};

export default connect(mapStateToProps)(SingleDeck);
