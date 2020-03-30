import styled, { css } from 'styled-components';
import { colors } from '~/styles/colors';

const Button = styled.div`
  position: relative;

  button {
    background: none;
    border: none;
    cursor: initial;

    svg {
      cursor: pointer;

      &.active:hover {
        color: ${colors.fastfeet} !important;
      }

      &.active {
        ${props =>
          props.active &&
          css`
            color: ${colors.fastfeet} !important;
          `}
      }
    }
  }
`;

export default Button;
