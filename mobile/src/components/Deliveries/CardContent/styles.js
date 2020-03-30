import styled, { css } from 'styled-components/native';

import { colors } from '~/styles/colors';

export const CardBox = styled.View`
  margin-bottom: 20px;
  height: 190px;
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 4px;
  background: #fff;
  elevation: 1;
`;

export const CardLabel = styled.View`
  padding: 13px 14px 0;
  flex-direction: row;
  align-items: center;
  margin-bottom: 24px;
`;

export const Text = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${colors.fastfeet};
`;

export const StatusBox = styled.View`
  align-self: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const LongPressButton = styled.TouchableWithoutFeedback``;

export const PointOne = styled.View`
  width: 10px;
  height: 10px;
  background: ${colors.fastfeet};
  border-radius: 5px;
`;

export const PointTwo = styled.View`
  width: 10px;
  height: 10px;
  border-width: 1px;
  border-color: ${colors.fastfeet};
  border-radius: 5px;
  ${props =>
    props.isChecked &&
    css`
      background: ${colors.fastfeet};
    `}
`;

export const PointThree = styled.View`
  width: 10px;
  height: 10px;
  border-width: 1px;
  border-color: ${colors.fastfeet};
  border-radius: 5px;
  ${props =>
    props.isChecked &&
    css`
      background: ${colors.fastfeet};
    `}
`;

export const PointText = styled.Text`
  position: absolute;
  left: ${props => props.position}px;
  top: 12px;
  width: 62px;
  text-align: center;
  font-size: 11px;
  color: #999999;
`;

export const Line = styled.View`
  height: 1px;
  width: 123px;
  background: ${colors.fastfeet};
`;

export const Footer = styled.View`
  margin-top: auto;
  height: 68px;
  background: #f8f9fd;
  flex-direction: row;
  padding: 20px 18px;
  justify-content: space-between;
  align-items: flex-end;
`;

export const DateBox = styled.View``;

export const Label = styled.Text`
  font-size: 10px;
  font-weight: bold;
  color: #999999;
`;

export const Info = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: #444444;
`;

export const CityBox = styled.View``;

export const Details = styled.TouchableOpacity``;

export const TextButton = styled.Text`
  font-size: 12px;
  font-weight: bold;
  color: ${colors.fastfeet};
`;
