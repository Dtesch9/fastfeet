import styled, { keyframes } from 'styled-components';

import { colors } from '~/styles/colors';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
    
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  svg {
    font-size: 200px;
    font-weight: bold;
    color: ${colors.fastfeet};

    animation: ${rotate} 2s linear infinite;
  }
`;
