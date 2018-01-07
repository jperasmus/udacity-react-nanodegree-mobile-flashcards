import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';

class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card'
  };

  render() {
    return (
      <View>
        <Text>Add Card View</Text>
      </View>
    );
  }
}

AddCard.propTypes = {};

export default AddCard;
