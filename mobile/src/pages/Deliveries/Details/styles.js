import styled from 'styled-components/native';

import { colors } from '~/styles/colors';

export const Information = styled.View`
  width: 375px;
  min-height: 235px;
  background: #fff;
  align-self: center;
  margin-top: -65px;
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 6px;
  elevation: 3;
  padding: 15px 12px;
`;

export const Label = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

export const Text = styled.Text`
  margin-left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.fastfeet};
`;

export const Title = styled.Text`
  text-transform: uppercase;
  font-size: 14px;
  font-weight: bold;
  color: #999999;
  margin-bottom: 5px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #666666;
  margin-bottom: 15px;
`;

export const Situation = styled.View`
  margin-top: 10px;
  width: 375px;
  min-height: 175px;
  background: #fff;
  align-self: center;
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 6px;
  elevation: 3;
  padding: 15px 30px 15px 12px;
`;

export const DateBox = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Date = styled.View``;
