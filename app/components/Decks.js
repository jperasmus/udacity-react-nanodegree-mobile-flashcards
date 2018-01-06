import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import isEmpty from '../helpers/is-empty';
import { CenteredContainer } from './styled';
import DeckListItem from './DeckListItem';

class Decks extends Component {
  _keyExtractor = item => item.title;

  render() {
    const { decks } = this.props;

    if (isEmpty(decks)) {
      return (
        <CenteredContainer>
          <MaterialCommunityIcons name="cards" size={40} />
          <Text>Add a deck to get started</Text>
        </CenteredContainer>
      );
    }

    return <FlatList data={Object.values(decks)} renderItem={DeckListItem} keyExtractor={this._keyExtractor} />;
  }
}

Decks.defaultProps = {
  decks: {}
};

Decks.propTypes = {
  decks: PropTypes.object
};

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(Decks);
