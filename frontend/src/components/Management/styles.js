import styled from 'styled-components';
import { darken } from 'polished';
import { colors } from '~/styles/colors';

export const Container = styled.div`
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h1 {
    font-size: 24px;
  }
`;

export const Actions = styled.div`
  display: flex;

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px 15px;
    border: none;
    color: white;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 4px;
    transition: background 150ms;

    &:nth-child(1) {
      background: #cccccc;

      &:hover {
        background: ${darken(0.08, '#cccccc')};
      }
    }

    &:nth-child(2) {
      background: ${colors.fastfeet};

      &:hover {
        background: ${darken(0.05, '#7d40e7')};
      }
    }

    & + button {
      margin-left: 16px;
    }

    svg {
      margin-right: 4px;
    }
  }
`;
