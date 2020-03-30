import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  background: #7d40e7;

  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Logo = styled.Image`
  width: 260px;
  height: 50px;
  margin-bottom: 37px;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  background: #fff;
  font-size: 16px;
  height: 46px;
  border-radius: 4px;
  padding: 0 20px;
  margin-bottom: 15px;
`;

export const SubmitButton = styled(Button)`
  align-self: stretch;
`;
