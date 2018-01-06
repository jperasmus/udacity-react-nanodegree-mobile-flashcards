import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, ListItemTitle, ListItemInfo } from './styled';

const DeckListItem = ({ item }) => {
  const { title, questions: { length } } = item;

  return (
    <ListItem>
      <ListItemTitle>{title}</ListItemTitle>
      <ListItemInfo>
        {length} {length === 1 ? 'card' : 'cards'}
      </ListItemInfo>
    </ListItem>
  );
};

DeckListItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.array.isRequired
  }).isRequired
};

export default DeckListItem;
