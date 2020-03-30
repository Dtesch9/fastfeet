import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

import { colors } from '~/styles/colors';

export const Container = styled.View`
  margin-top: 12px;
  width: 375px;
  height: 120px;
  background: #f8f9fd;
  border-width: 1px;
  border-color: #0000001a;
  elevation: 3;
  align-self: center;

  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

export const Appearance = styled.View`
  flex: 1;
  ${props =>
    props.borderBreak
      ? null
      : css`
          border-right-width: 1px;
          border-right-color: #0000001a;
        `}
`;

export const Action = styled(RectButton).attrs(props => ({
  underlayColor: props.disabled,
  rippleColor: colors.fastfeet,
}))`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  max-width: 65px;
  text-align: center;
  font-size: 13px;
  color: #999999;
`;
