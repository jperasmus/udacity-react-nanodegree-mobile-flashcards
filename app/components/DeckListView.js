import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LargeList } from 'react-native-largelist';
import DeckListItem from './DeckListItem';
import { CenteredContainer } from './styled';
import isEmpty from '../helpers/is-empty';
import { white } from '../helpers/colors';
import { fetchDecks } from '../actions/index';
import sortByAttr from '../helpers/sort-by-attr';

export const DeckListViewTabBarIcon = ({ tintColor, focused }) => (
  <MaterialCommunityIcons name={focused ? 'cards' : 'cards-outline'} size={26} style={{ color: tintColor }} />
);

DeckListViewTabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired
};

class DeckListView extends Component {
  state = {
    refreshing: false,
    viewAnimation: new Animated.Value(0)
  };

  componentDidMount() {
    this.props.getDecks();

    Animated.timing(this.state.viewAnimation, {
      toValue: 1,
      duration: 1000
    }).start();
  }

  refresh = () => {
    const afterFadeOut = async () => {
      await this.props.getDecks();
      // Spoofing a 400ms timeout here before stopping the refresh setting, so that it is at least
      // apparent to the user that the list is refreshed
      // If this was actually making a request to a remote server, it would be a bit more realistic
      setTimeout(
        () =>
          this.setState({ refreshing: false }, () => {
            Animated.timing(this.state.viewAnimation, {
              toValue: 1,
              duration: 200
            }).start();
          }),
        400
      );
    };

    const whileRefreshing = () => {
      Animated.timing(this.state.viewAnimation, {
        toValue: 0.85,
        duration: 200
      }).start(afterFadeOut);
    };

    this.setState({ refreshing: true }, whileRefreshing);
  };

  navigateToDeck = title => {
    this.props.navigation.navigate('Single', { title });
  };

  renderItem = (section, index) => {
    const item = this.data[index];
    return <DeckListItem key={item.title} onPress={this.navigateToDeck} item={item} />;
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

    this.data = sortByAttr('title', Object.values(decks));

    return (
      <Animated.View
        style={{ backgroundColor: white, flex: 1, opacity: this.state.viewAnimation }}
        key={this.data.length}
      >
        <LargeList
          style={{ flex: 1 }}
          bounces
          refreshing={this.state.refreshing}
          onRefresh={this.refresh}
          renderCell={this.renderItem}
          numberOfRowsInSection={() => this.data.length}
          heightForCell={() => 70}
        />
      </Animated.View>
    );
  }
}

DeckListView.defaultProps = {
  decks: {}
};

DeckListView.propTypes = {
  decks: PropTypes.object,
  navigation: PropTypes.object.isRequired,
  getDecks: PropTypes.func.isRequired
};

const mapStateToProps = ({ decks }) => ({ decks });

const mapDispatchToProps = dispatch => ({ getDecks: () => dispatch(fetchDecks()) });

export default connect(mapStateToProps, mapDispatchToProps)(DeckListView);
