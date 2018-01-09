import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator, Button, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import get from 'lodash.get';
import { CenteredContainer, Input, Instructions } from './styled';
import { yellow, black75 } from '../helpers/colors';
import { addCard } from '../actions';

const defaultState = {
  question: '',
  answer: ''
};

const noop = () => null;

class AddCard extends Component {
  static navigationOptions = ({ navigation }) => {
    const params = get(navigation, 'state.params', {});
    let headerRight = <Button title="Save" color={yellow} onPress={params.submit ? params.submit : noop} />;

    if (params.isSaving) {
      headerRight = <ActivityIndicator />;
    }

    return { headerRight };
  };

  state = { ...defaultState };

  componentDidMount() {
    this.props.navigation.setParams({ submit: this.submit });
  }

  fieldChange = field => value => {
    this.setState({ [field]: value });
  };

  submit = () => {
    const { navigation, saveCard } = this.props;
    const { question, answer } = this.state;

    if (!question || !answer) {
      return;
    }

    navigation.setParams({ isSaving: true });

    saveCard(this.state)
      .then(() => {
        this.setState({ ...defaultState }, () => {
          navigation.setParams({ isSaving: false });
          navigation.goBack();
        });
      })
      .catch(error => {
        Alert.alert('Whoops!', error.message, [{ text: 'OK' }], {
          cancelable: false
        });
        navigation.setParams({ isSaving: false });
      });
  };

  render() {
    const { question, answer } = this.state;

    return (
      <KeyboardAwareScrollView style={{ backgroundColor: black75 }}>
        <Instructions>Add the question and corresponding answer for this card</Instructions>
        <CenteredContainer>
          <Input
            allowFontScaling
            maxLength={140}
            keyboardAppearance="dark"
            returnKeyType="next"
            selectionColor={yellow}
            placeholderTextColor={yellow}
            placeholder="Question"
            onChangeText={this.fieldChange('question')}
            value={question}
          />
          <Input
            allowFontScaling
            maxLength={140}
            keyboardAppearance="dark"
            returnKeyType="done"
            selectionColor={yellow}
            placeholderTextColor={yellow}
            placeholder="Answer"
            onChangeText={this.fieldChange('answer')}
            value={answer}
          />
        </CenteredContainer>
      </KeyboardAwareScrollView>
    );
  }
}

AddCard.propTypes = {
  navigation: PropTypes.object.isRequired,
  saveCard: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch, { navigation }) => ({
  saveCard: card => dispatch(addCard({ title: get(navigation, 'state.params.title', ''), card }))
});

export default connect(undefined, mapDispatchToProps)(AddCard);
