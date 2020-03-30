import styled from 'styled-components/native';

import { Input as unformInput } from '~/components/Form';
import Button from '~/components/Button';
import { colors } from '~/styles/colors';

export const KeyboardDismiss = styled.TouchableOpacity`
  flex: 1;
`;

export const Container = styled.View`
  flex: 1;
  width: 375px;
  align-self: center;
`;

export const Input = styled(unformInput).attrs({
  placeholderTextColor: '#999999',
  textAlignVertical: 'top',
  numberOfLines: 40,
})`
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 6px;
  elevation: 2;
  background: #fff;
  height: 350px;
  margin-top: -75px;

  padding: 20px;
  font-size: 18px;
  color: #999999;
  text-align: left;
`;

export const SubmitButton = styled(Button)`
  margin-top: 20px;
  background: ${colors.fastfeet};
`;
