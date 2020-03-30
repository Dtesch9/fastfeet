import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Grid = styled.div`
  ul {
    grid-template-columns: repeat(4, 1fr) 100px;
  }
`;
