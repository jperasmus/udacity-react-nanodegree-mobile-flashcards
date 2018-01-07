import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ListItem, ListItemTitle, ListItemInfo } from './styled';
import { white } from '../helpers/colors';

const DeckListItem = ({ item, onPress }) => {
  const { title, questions: { length } } = item;

  return (
    <ListItem onPress={() => onPress(title)}>
      <View>
        <ListItemTitle>{title}</ListItemTitle>
        <ListItemInfo>
          {length} {length === 1 ? 'card' : 'cards'}
        </ListItemInfo>
      </View>
      <View>
        <Ionicons name="ios-arrow-dropright" color={white} size={22} />
      </View>
    </ListItem>
  );
};

DeckListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired
  }).isRequired,
  onPress: PropTypes.func.isRequired
};

export default DeckListItem;
