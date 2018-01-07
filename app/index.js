import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { View } from 'react-native';
import store from './store';
import DecksStack from './components/DecksStack';
import FlashCardStatusBar from './components/FlashCardStatusBar';
import { black } from './helpers/colors';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <FlashCardStatusBar barStyle="light-content" backgroundColor={black} />
          <DecksStack />
        </View>
      </Provider>
    );
  }
}
