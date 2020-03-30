import styled, { css } from 'styled-components/native';

import { colors } from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  margin-top: 23px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #444444;
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled.TouchableOpacity`
  margin-left: 15px;
`;

export const TextButton = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.active ? `${colors.fastfeet}` : '#999999')};

  ${props =>
    props.active &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${colors.fastfeet};
    `}
`;

export const Card = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 10px;
`;

export const Awaiting = styled.ActivityIndicator.attrs(props => ({
  size: props.size,
  color: colors.fastfeet,
}))`
  flex: 1;
`;
