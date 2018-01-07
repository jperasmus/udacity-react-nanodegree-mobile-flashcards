import styled from 'styled-components/native';
import { white, black, gray, red, black75 } from '../helpers/colors';

export const CenteredContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ListItem = styled.TouchableOpacity`
  flex: 1;
  background-color: ${black75};
  margin: 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom-width: 1px;
  border-bottom-color: ${gray};
`;

export const ListItemTitle = styled.Text`
  font-size: 20px;
  color: ${white};
`;

export const ListItemInfo = styled.Text`
  font-size: 14px;
  color: ${white};
`;

export const DeckTitle = styled.Text`
  font-size: 36px;
  color: ${white};
  margin-top: 30px;
  margin-bottom: 15px;
`;

export const DeckDescription = styled.Text`
  font-size: 20px;
  color: ${white};
  margin-bottom: 15px;
`;

export const DeckInfo = styled.Text`
  font-size: 24px;
  color: ${gray};
  margin-bottom: 15px;
`;

export const StyledButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: 15px;
  padding: 15px 30px;
  border-radius: 30px;
  background-color: ${props => (props.isPrimary ? red : white)};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${black};
`;
