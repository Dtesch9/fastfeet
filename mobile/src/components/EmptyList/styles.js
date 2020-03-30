import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const EmptyComponent = styled.View`
  background: rgba(0, 0, 0, 0.6);
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 6px;
  width: 375px;
  height: 500px;
  padding: 18px;
  align-items: center;
  justify-content: center;
  position: relative;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'contain',
})`
  width: 320px;
  height: 100px;
`;

export const Description = styled.Text`
  position: absolute;
  top: 2px;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;
