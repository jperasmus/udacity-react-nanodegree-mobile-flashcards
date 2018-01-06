import styled from 'styled-components/native';
import { white } from '../helpers/colors';

export const CenteredContainer = styled.View`
  flex: 1;
  background-color: ${white};
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.View`
  flex: 1;
  background-color: #fff;
  margin: 15px 0;
  align-items: center;
  justify-content: center;
`;

export const ListItemTitle = styled.Text`
  font-size: 20px;
`;

export const ListItemInfo = styled.Text`
  font-size: 14px;
`;
