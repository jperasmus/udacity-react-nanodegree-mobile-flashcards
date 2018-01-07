import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class AddDeck extends Component {
  static navigationOptions = {
    title: 'Add Deck'
  };

  render() {
    return (
      <View>
        <Text>Add Deck View</Text>
      </View>
    );
  }
}

AddDeck.propTypes = {};

export default AddDeck;
