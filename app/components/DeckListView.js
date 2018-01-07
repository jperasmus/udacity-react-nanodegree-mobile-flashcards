import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import isEmpty from '../helpers/is-empty';
import { CenteredContainer } from './styled';
import DeckListItem from './DeckListItem';

class DeckListView extends Component {
  static navigationOptions = {
    title: 'Decks'
  };

  keyExtractor = item => item.title;

  navigateToDeck = title => {
    this.props.navigation.navigate('Single', { title });
  };

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

    return (
      <FlatList
        data={Object.values(decks)}
        renderItem={item => <DeckListItem onPress={this.navigateToDeck} {...item} />}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

DeckListView.defaultProps = {
  decks: {}
};

DeckListView.propTypes = {
  decks: PropTypes.object,
  navigation: PropTypes.object.isRequired
};

const mapStateToProps = ({ decks }) => ({ decks });

export default connect(mapStateToProps)(DeckListView);
