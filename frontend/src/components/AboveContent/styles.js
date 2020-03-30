import styled, { css } from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles/colors';

export const Container = styled.div`
  margin-top: 34px;

  h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export const Content = styled.div`
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  div {
    display: flex;
    width: 255px;
    height: 36px;
    padding: 6px 12px;
    background: #fff;
    ${props =>
      props.error
        ? css`
            border: 1px solid red;
          `
        : css`
            border: 1px solid #dddddd;
          `}

    border-radius: 4px;
    position: relative;

    button {
      background: none;
      border: none;
    }
  }

  input {
    width: 220px;
    height: 34px;
    padding: 6px;
    border: none;
    border-radius: 4px;
    position: absolute;
    right: 0;
    top: 0;
  }

  a {
    display: flex;
    align-items: center;
    padding: 6px 14px;
    background: ${colors.fastfeet};
    border-radius: 4px;
    color: white;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
      background: ${darken(0.04, '#7d40e7')};
    }
  }
`;
