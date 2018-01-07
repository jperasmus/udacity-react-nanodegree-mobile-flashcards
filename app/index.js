import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import DecksStack from './components/DecksStack';

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <DecksStack />
      </Provider>
    );
  }
}
