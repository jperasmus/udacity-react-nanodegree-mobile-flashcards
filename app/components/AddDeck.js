import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CenteredContainer, Input, Instructions } from './styled';
import { yellow, black75 } from '../helpers/colors';
import { addDeck } from '../actions';
import { DECK_ALREADY_EXIST } from '../utils/constants';

export const AddDeckTabBarIcon = ({ tintColor, focused }) => (
  <Ionicons name={focused ? 'ios-add-circle' : 'ios-add-circle-outline'} size={26} style={{ color: tintColor }} />
);

AddDeckTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

const defaultState = {
  title: '',
  description: ''
};
const noop = () => null;

class AddDeck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    let headerLeft = <Button title="Clear" color={yellow} onPress={params.clear ? params.clear : noop} />;
    let headerRight = <Button title="Save" color={yellow} onPress={params.submit ? params.submit : noop} />;

    if (params.isClearing) {
      headerLeft = <ActivityIndicator />;
    }

    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }

    return { headerRight, headerLeft };
  };

  state = { ...defaultState };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit, clear: this.clear });
  }

  fieldChange = field => value => {
    this.setState({ [field]: value });
  };

  clear = () => {
    this.props.navigation.setParams({ isClearing: true });
    this.setState({ ...defaultState }, () => this.props.navigation.setParams({ isClearing: false }));
  };

  submit = () => {
    const { navigation, saveDeck } = this.props;

    if (!this.state.title) {
      return;
    }

    navigation.setParams({ isSaving: true });

    saveDeck(this.state)
      .then(() => {
        const { title } = this.state;
        this.setState({ ...defaultState }, () => {
          navigation.setParams({ isSaving: false });
          navigation.navigate('Single', { title });
        });
      })
      .catch(error => {
        const errorMessage =
          error.message === DECK_ALREADY_EXIST
            ? 'Looks like there is already a deck with that name'
            : 'An unexpected error occurred';

        Alert.alert('Whoops!', errorMessage, [{ text: 'OK' }], {
          cancelable: false
        });
        navigation.setParams({ isSaving: false });
      });
  };

  render() {
    const { title, description } = this.state;

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: black75 }}>
        <Instructions>Name your new deck and optionally give it a description</Instructions>
        <CenteredContainer>
          <Input
            allowFontScaling
            maxLength={25}
            keyboardAppearance="dark"
            selectionColor={yellow}
            placeholderTextColor={yellow}
            placeholder="Name"
            onChangeText={this.fieldChange('title')}
            value={title}
          />
          <Input
            allowFontScaling
            autoGrow
            maxLength={140}
            keyboardAppearance="dark"
            selectionColor={yellow}
            placeholderTextColor={yellow}
            placeholder="Description"
            onChangeText={this.fieldChange('description')}
            value={description}
          />
        </CenteredContainer>
      </KeyboardAwareScrollView>
    );
  }
}

AddDeck.propTypes = {
  navigation: PropTypes.object.isRequired,
  saveDeck: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  saveDeck: payload => dispatch(addDeck(payload))
});

export default connect(undefined, mapDispatchToProps)(AddDeck);
