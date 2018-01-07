import styled from 'styled-components/native';
import { white, black, gray, red } from '../helpers/colors';

export const CenteredContainer = styled.View`
  flex: 1;
  background-color: ${white};
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.TouchableOpacity`
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

export const DeckTitle = styled.Text`
  font-size: 28px;
  color: ${black};
`;

export const DeckInfo = styled.Text`
  font-size: 21px;
  color: ${gray};
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  background-color: ${props => (props.isPrimary ? red : black)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${props => (props.isPrimary ? black : white)};
`;
