import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, FlatList, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeckListItem from './DeckListItem';
import { CenteredContainer } from './styled';
import isEmpty from '../helpers/is-empty';
import { white } from '../helpers/colors';

export const DeckListViewTabBarIcon = ({ tintColor, focused }) => (
  <MaterialCommunityIcons name={focused ? 'cards' : 'cards-outline'} size={26} style={{ color: tintColor }} />
);

DeckListViewTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

class DeckListView extends Component {
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
      <View style={{ backgroundColor: white, flex: 1 }}>
        <FlatList
          data={Object.values(decks)}
          renderItem={item => <DeckListItem onPress={this.navigateToDeck} {...item} />}
          keyExtractor={this.keyExtractor}
        />
      </View>
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
