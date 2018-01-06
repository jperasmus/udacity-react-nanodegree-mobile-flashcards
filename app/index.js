import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Text } from 'react-native';
import { CenteredContainer } from './components/styled';
import store from './store';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CenteredContainer>
          <Text>howzit!!</Text>
        </CenteredContainer>
      </Provider>
    );
  }
}
