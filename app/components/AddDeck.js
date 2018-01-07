import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const AddDeckTabBarIcon = ({ tintColor, focused }) => (
  <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={26} style={{ color: tintColor }} />
);

AddDeckTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

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
