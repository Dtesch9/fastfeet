import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  padding: 0 35px;
`;

export const Avatar = styled.Image`
  width: 136px;
  height: 136px;
  border-radius: 68px;
  align-self: center;
  margin-top: 100px;
`;

export const Info = styled.View`
  margin-top: 50px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #666666;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: #444444;
  margin-bottom: 15px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #e74040;
`;
