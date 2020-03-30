import styled from 'styled-components/native';

import { colors } from '~/styles/colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  margin-top: -75px;
`;

export const Label = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

export const ProblemList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 16px;
`;

export const Box = styled.View`
  background: #fff;
  border-width: 1px;
  border-color: #0000001a;
  border-radius: 6px;
  width: 375px;
  min-height: 60px;
  padding: 18px;
  margin-bottom: 14px;
`;

export const Description = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Problem = styled.Text.attrs(props => ({
  numberOfLines: props.switcher ? 0 : 1,
}))`
  text-align: left;
  font-size: 16px;
  color: #999999;
  max-width: 250px;
`;

export const Date = styled.Text`
  font-size: 13px;
  color: #c1c1c1;
`;

export const Awaiting = styled.ActivityIndicator.attrs({
  size: 100,
  color: colors.fastfeet,
})`
  width: 100%;
  height: 100%;
`;
